$(document).ready(function () {
    const apiUrls = process.env.VOICE_API_URLS.split(',');
    const speakers = {
        "zh-CN-XiaoxiaoNeural": "晓晓",
        "zh-CN-YunxiNeural": "云希",
        "zh-CN-YunjianNeural": "云健",
        "zh-CN-XiaoyiNeural": "晓伊",
        "zh-CN-YunyangNeural": "云扬",
        "zh-CN-XiaochenNeural": "晓辰",
        "zh-CN-XiaochenMultilingualNeural": "晓辰 多语言",
        "zh-CN-XiaohanNeural": "晓涵",
        "zh-CN-XiaomengNeural": "晓梦",
        "zh-CN-XiaomoNeural": "晓墨",
        "zh-CN-XiaoqiuNeural": "晓秋",
        "zh-CN-XiaorouNeural": "晓柔",
        "zh-CN-XiaoruiNeural": "晓睿",
        "zh-CN-XiaoshuangNeural": "晓双",
        "zh-CN-XiaoxiaoDialectsNeural": "晓晓 方言",
        "zh-CN-XiaoxiaoMultilingualNeural": "晓晓 多语言",
        "zh-CN-XiaoyanNeural": "晓颜",
        "zh-CN-XiaoyouNeural": "晓悠",
        "zh-CN-XiaoyuMultilingualNeural": "晓宇 多语言",
        "zh-CN-XiaozhenNeural": "晓甄",
        "zh-CN-YunfengNeural": "云枫",
        "zh-CN-YunhaoNeural": "云皓",
        "zh-CN-YunjieNeural": "云杰",
        "zh-CN-YunxiaNeural": "云夏",
        "zh-CN-YunyeNeural": "云野",
        "zh-CN-YunyiMultilingualNeural": "云逸 多语言",
        "zh-CN-YunzeNeural": "云泽",
        "zh-CN-YunfanMultilingualNeural": "云帆 多语言",
        "zh-CN-YunxiaoMultilingualNeural": "云萧 多语言",
        "zh-CN-guangxi-YunqiNeural": "云奇 广西",
        "zh-CN-henan-YundengNeural": "云登",
        "zh-CN-liaoning-XiaobeiNeural": "晓北 辽宁",
        "zh-CN-liaoning-YunbiaoNeural": "云彪 辽宁",
        "zh-CN-shaanxi-XiaoniNeural": "晓妮",
        "zh-CN-shandong-YunxiangNeural": "云翔",
        "zh-CN-sichuan-YunxiNeural": "云希 四川",
        "zh-HK-HiuMaanNeural": "曉曼",
        "zh-HK-WanLungNeural": "雲龍",
        "zh-HK-HiuGaaiNeural": "曉佳",
        "zh-TW-HsiaoChenNeural": "曉臻",
        "zh-TW-YunJheNeural": "雲哲",
        "zh-TW-HsiaoYuNeural": "曉雨"
    };

    function updateApiOptions() {
        const apiSelect = $('#api');
        apiSelect.empty();
        apiUrls.forEach((url, index) => {
            apiSelect.append(new Option(`voice-api-${index + 1}`, url));
        });
    }

    function updateSpeakerOptions() {
        const speakerSelect = $('#speaker');
        speakerSelect.empty();
        Object.entries(speakers).forEach(([key, value]) => {
            speakerSelect.append(new Option(value, key));
        });

        $('#voiceapiParams').show();
    }

    function updateSliderLabel(sliderId, labelId) {
        const slider = $(`#${sliderId}`);
        const label = $(`#${labelId}`);
        label.text(slider.val());
        slider.on('input', function () {
            label.text(this.value);
        });
    }

    // 启用工具提示
    $('[data-toggle="tooltip"]').tooltip();

    // 更新 API 选项
    updateApiOptions();

    // 设置初始 API 为第一个 voice-api
    $('#api').val(apiUrls[0]);
    updateSpeakerOptions();

    // 更新所选 URL 的讲述人选项
    $('#api').on('change', function () {
        updateSpeakerOptions();
    });

    // 初始化语速和语调滑块
    updateSliderLabel('rate', 'rateValue');
    updateSliderLabel('pitch', 'pitchValue');

    $('#text2voice-form').on('submit', function (event) {
        event.preventDefault();
        generateVoice(false);
    });

    $('#previewButton').on('click', function () {
        generateVoice(true);
    });

    function generateVoice(isPreview) {
        const apiUrl = $('#api').val();
        const speaker = $('#speaker').val();
        const text = $('#text').val();
        const previewText = isPreview ? text.substring(0, 20) : text;
        let url = `${apiUrl}?t=${encodeURIComponent(previewText)}&v=${encodeURIComponent(speaker)}`;

        const rate = $('#rate').val();
        const pitch = $('#pitch').val();
        url += `&r=${encodeURIComponent(rate)}&p=${encodeURIComponent(pitch)}&o=audio-24khz-48kbitrate-mono-mp3`;

        $('#loading').show();
        $('#result').hide();
        $('#generateButton').prop('disabled', true);
        $('#previewButton').prop('disabled', true);

        $.ajax({
            url: url,
            method: 'GET',
            xhrFields: {
                responseType: 'blob'
            },
            success: function (blob) {
                const voiceUrl = URL.createObjectURL(blob);
                $('#audio').attr('src', voiceUrl);
                $('#audio')[0].load();
                if (!isPreview) {
                    $('#download').attr('href', voiceUrl);
                    const timestamp = new Date().toLocaleTimeString();
                    const shortenedText = text.length > 20 ? text.substring(0, 20) + '...' : text;
                    addHistoryItem(timestamp, shortenedText, voiceUrl);
                }
                $('#result').show();
                $('#loading').hide();
                $('#generateButton').prop('disabled', false);
                $('#previewButton').prop('disabled', false);
            },
            error: function () {
                alert('请求失败，请检查网络连接');
                $('#loading').hide();
                $('#generateButton').prop('disabled', false);
                $('#previewButton').prop('disabled', false);
            }
        });
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

    window.clearHistory = function () {
        $('#historyItems').empty();
        alert("历史记录已清除！");
    };
});
