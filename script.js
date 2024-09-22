let apiConfig;
let lastRequestTime = 0;

function loadSpeakers() {
    return $.ajax({
        url: 'speakers.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            apiConfig = data;
            updateSpeakerOptions('voice-api');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(`加载讲述者失败：${textStatus} - ${errorThrown}`);
        }
    });
}

function updateSpeakerOptions(apiName) {
    const speakers = apiConfig[apiName].speakers;
    const speakerSelect = $('#speaker');
    speakerSelect.empty();
    Object.entries(speakers).forEach(([key, value]) => {
        speakerSelect.append(new Option(value, key));
    });
}

function updateSliderLabel(sliderId, labelId) {
    const slider = $(`#${sliderId}`);
    const label = $(`#${labelId}`);
    label.text(slider.val());
    slider.on('input', function () {
        label.text(this.value);
    });
}

$(document).ready(function () {
    loadSpeakers().then(() => {
        $('[data-toggle="tooltip"]').tooltip();

        $('#api').on('change', function () {
            updateSpeakerOptions(this.value);
        });

        updateSliderLabel('rate', 'rateValue');
        updateSliderLabel('pitch', 'pitchValue');

        $('#text').on('input', function () {
            $('#charCount').text(`字符数统计：${this.value.length}/3600`);
        });

        $('#text2voice-form').on('submit', function (event) {
            event.preventDefault();
            if (canMakeRequest()) {
                generateVoice(false);
            } else {
                alert('请稍候再试，每5秒只能请求一次。');
            }
        });

        $('#previewButton').on('click', function () {
            if (canMakeRequest()) {
                generateVoice(true);
            } else {
                alert('请稍候再试，每5秒只能请求一次。');
            }
        });
    });
});

function canMakeRequest() {
    const currentTime = Date.now();
    if (currentTime - lastRequestTime >= 5000) {
        lastRequestTime = currentTime;
        return true;
    }
    return false;
}

function generateVoice(isPreview) {
    const apiName = $('#api').val();
    const apiUrl = apiConfig[apiName].url;
    const speaker = $('#speaker').val();
    const text = $('#text').val();
    const previewText = isPreview ? text.substring(0, 20) : text;
    const rate = $('#rate').val();
    const pitch = $('#pitch').val();

    if (apiName === 'voice-api') {
        let url = `${apiUrl}?t=${encodeURIComponent(previewText)}&v=${encodeURIComponent(speaker)}`;
        url += `&r=${encodeURIComponent(rate)}&p=${encodeURIComponent(pitch)}&o=audio-24khz-48kbitrate-mono-mp3`;

        makeRequest(url, isPreview, text);
    } else if (apiName === 'lobe-api') {
        const url = `${apiUrl}?model=${encodeURIComponent(speaker)}&input=${encodeURIComponent(previewText)}&voice=${encodeURIComponent(`rate:${rate}|pitch:${pitch}`)}`;
        
        $.ajax({
            url: url,
            method: 'GET',
            xhrFields: {
                responseType: 'blob'
            },
            success: (blob) => {
                console.log('Blob type:', blob.type); // 调试信息
                handleSuccess(blob, isPreview, text);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.error(`请求失败：${textStatus} - ${errorThrown}`);
                console.error(`响应内容：${jqXHR.responseText}`);
                alert(`请求失败：${textStatus} - ${errorThrown}`);
            }
        });
    }
}

function makeRequest(url, isPreview, text) {
    $('#loading').show();
    $('#result').hide();
    $('#generateButton').prop('disabled', true);
    $('#previewButton').prop('disabled', true);

    $.ajax({
        url: url,
        method: 'GET',
        headers: {
            'x-api-key': '@ak47'
        },
        xhrFields: {
            responseType: 'blob'
        },
        success: (blob) => handleSuccess(blob, isPreview, text),
        error: handleError
    });
}

function handleSuccess(blob, isPreview, text) {
    console.log('Blob type:', blob.type); // 添加调试信息
    if (blob.type !== "audio/mpeg") {
        console.error('Invalid Blob type:', blob.type);
        alert('请求失败：无效的音频格式');
        $('#loading').hide();
        $('#generateButton').prop('disabled', false);
        $('#previewButton').prop('disabled', false);
        return;
    }

    const voiceUrl = URL.createObjectURL(blob);
    $('#audio').attr('src', voiceUrl);
    $('#audio')[0].load();
    if (!isPreview) {
        $('#download').attr('href', voiceUrl);
        const timestamp = new Date().toLocaleTimeString();
        const shortenedText = text.length > 5 ? text.substring(0, 5) + '...' : text;
        addHistoryItem(timestamp, shortenedText, voiceUrl);
    }
    $('#result').show();
    $('#loading').hide();
    $('#generateButton').prop('disabled', false);
    $('#previewButton').prop('disabled', false);
}

function handleError(jqXHR, textStatus, errorThrown) {
    console.error(`请求失败：${textStatus} - ${errorThrown}`);
    alert(`请求失败：${textStatus} - ${errorThrown}`);
    $('#loading').hide();
    $('#generateButton').prop('disabled', false);
    $('#previewButton').prop('disabled', false);
}

function addHistoryItem(timestamp, text, audioURL) {
    const historyItems = $('#historyItems');
    const historyItem = $(`
        <div class="history-item">
            <span>${timestamp} - ${text}</span>
            <div>
                <button class="btn btn-secondary" onclick="playAudio('${audioURL}')">播放</button>
                <button class="btn btn-info" onclick="downloadAudio('${audioURL}')">下载</button>
            </div>
        </div>
    `);
    historyItems.append(historyItem);
}

function playAudio(audioURL) {
    const audioElement = $('#audio')[0];
    audioElement.src = audioURL;
    audioElement.load();
    audioElement.play();
}

function downloadAudio(audioURL) {
    const link = document.createElement('a');
    link.href = audioURL;
    link.download = 'audio.mp3';
    link.click();
}

function clearHistory() {
    $('#historyItems').empty();
    alert("历史记录已清除！");
}
