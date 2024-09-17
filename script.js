const apiConfig = {
    aivoicenet: {
        url: "https://api.pearktrue.cn/api/aivoicenet",
        speakers: [
            "宇祥", "宇蓝", "蕊柔", "宇智", "宇希", "希儿", "蕊诗", "蕊雪", "蕊姗", "珊儿",
            "婉儿", "智宸", "宇昊", "宇铭", "宇伟", "紫瑶", "紫阿", "紫雪", "紫娜", "紫芸", 
            "宇全", "玲儿", "艾婷", "宇诚", "宇盛", "宇栋", "宇光", "艾琳", "艾莉", "艾雯",
            "艾诗", "宇驰", "艾薇", "艾洁", "艾蕊", "宇骏", "宇康", "艾悦", "艾冉", "艾楠",
            "宇铭", "艾婧", "艾露", "艾思", "艾媛", "艾茜", "艾菲", "艾雅", "宇泽", "艾冉-情感女声",
            "晓萱-情感女声", "晓辰-知性女生", "晓晓-情感", "晓伊-儿童音", "云健-情感男声", "云夏-儿童音", 
            "云扬-青年男声", "云希-解说小帅", "晓贝-东北", "晓妮-陕西", "晓枫-情感女声", "晓新-情感女声",
            "云辰-台湾", "沁荷", "芸语", "语嫣", "蕊珠", "沁娜", "沁蕾", "宇璋", "馨月", "馨兰", 
            "宇尚", "宇同", "馨欣", "馨瑶", "宇韦", "宇晋", "蕊芬", "宇晋", "蕊莉", "沁雨",
            "沁香", "宇康", "馨逸", "沁莲", "宇栋", "馨荣", "芸渲", "芸露", "芸梅", "蕊若",
            "蕊晗", "沁美", "芸柔", "蕊韵", "宇彦", "芸茜", "蕊诗", "晓墨-青年女声", "云枫-磁性男声",
            "晓悠-儿童音", "晓睿-老年女声", "晓梦-年轻女声", "云野-成熟男声", "晓双-儿童音", "晓秋-中年女声",
            "云皓-中年男声", "晓颜-青年女声", "云泽-成熟浑厚", "晓甄-温柔女声", "云非-香港", "云溢-香港",
            "云信-香港"
        ]
    },
    voiceapi: {
        url: "https://voiceapi.firefly.oy.lc/tts",
        speakers: {
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
        }
    }
};

function updateSpeakerOptions(apiName) {
    const speakers = apiConfig[apiName].speakers;
    const speakerSelect = $('#speaker');
    speakerSelect.empty();
    Object.entries(speakers).forEach(([key, value]) => {
        speakerSelect.append(new Option(value, key));
    });

    const showAdditionalParams = apiName === 'voiceapi';
    $('#voiceapiParams').toggle(showAdditionalParams);
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
    // 启用工具提示
    $('[data-toggle="tooltip"]').tooltip();
    
    // 设置初始API为voiceapi
    updateSpeakerOptions('voiceapi');

    // 更新所选 API 的讲述人选项
    $('#api').on('change', function () {
        updateSpeakerOptions(this.value);
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
});

function generateVoice(isPreview) {
    const apiName = $('#api').val();
    const apiUrl = apiConfig[apiName].url;
    const speaker = $('#speaker').val();
    const text = $('#text').val();
    const previewText = isPreview ? text.substring(0, 10) : text;
    let url = `${apiUrl}?t=${encodeURIComponent(previewText)}&v=${encodeURIComponent(speaker)}`;

    if (apiName === 'voiceapi') {
        const rate = $('#rate').val();
        const pitch = $('#pitch').val();
        url += `&r=${encodeURIComponent(rate)}&p=${encodeURIComponent(pitch)}&o=audio-24khz-48kbitrate-mono-mp3`;
    }

    $('#loading').show();
    $('#result').hide();
    $('#generateButton').prop('disabled', true);
    $('#previewButton').prop('disabled', true);

    $.ajax({
        url: url,
        method: 'GET',
        xhrFields: {
            responseType: 'blob' // 确保返回的是一个Blob对象
        },
        success: function (blob) {
            const voiceUrl = URL.createObjectURL(blob);
            $('#audio').attr('src', voiceUrl);
            $('#audio')[0].load();  // 确保加载音频文件
            if (!isPreview) {
                $('#download').attr('href', voiceUrl);
                addHistoryItem(text, voiceUrl);
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

function addHistoryItem(text, audioURL) {
    const historyItems = $('#historyItems');
    const historyItem = $(`
        <div class="history-item">
            <span>${text}</span>
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
    audioElement.load();  // 确保加载音频文件
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
}
