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
            "云信-香港", "源司", "银时", "绫音", "绚濑", "星奈", "莉亚", "莉娜", "琉璃", "力丸",
            "小雪", "翔太", "小春", "小梓", "春香", "佑果", "小彩", "美月", "影山", "紫苑",
            "时雨", "龙之介", "梨斗", "悠里", "穗乃香", "Liam", "Mason", "Skylar", "Vanessa", "Kayla",
            "Sadie", "Daniel", "Jacob", "Natalie", "Tyler", "Lily", "Thomas", "Harper", "Henry", "Naomi",
            "Ethan", "Emma", "Ava", "Lucas", "Chloe", "Caleb", "Sofia", "Gabriel", "Ivy"
        ]
    },
    leftsite: {
        url: "https://t.leftsite.cn/tts",
        speakers: [
            "zh-CN-XiaoxiaoMultilingualNeural", "zh-CN-XiaoxiaoNeural", "zh-CN-YunxiNeural", "zh-CN-YunjianNeural",
            "zh-CN-XiaoyiNeural", "zh-CN-YunyangNeural", "zh-CN-XiaochenNeural", "zh-CN-XiaohanNeural",
            "zh-CN-XiaomengNeural", "zh-CN-XiaomoNeural", "zh-CN-XiaoqiuNeural", "zh-CN-XiaorouNeural",
            "zh-CN-XiaoruiNeural", "zh-CN-XiaoshuangNeural", "zh-CN-XiaoyanNeural", "zh-CN-XiaoyouNeural",
            "zh-CN-XiaozhenNeural", "zh-CN-YunfengNeural", "zh-CN-YunhaoNeural", "zh-CN-YunjieNeural",
            "zh-CN-YunxiaNeural", "zh-CN-YunyeNeural", "zh-CN-YunzeNeural", "zh-CN-YunfanMultilingualNeural",
            "zh-CN-YunxiaoMultilingualNeural", "zh-CN-guangxi-YunqiNeural", "zh-CN-henan-YundengNeural",
            "zh-CN-liaoning-XiaobeiNeural", "zh-CN-liaoning-YunbiaoNeural", "zh-CN-shaanxi-XiaoniNeural",
            "zh-CN-shandong-YunxiangNeural", "zh-CN-sichuan-YunxiNeural", "zh-HK-HiuMaanNeural", 
            "zh-HK-WanLungNeural", "zh-HK-HiuGaaiNeural", "zh-TW-HsiaoChenNeural", "zh-TW-YunJheNeural",
            "zh-TW-HsiaoYuNeural"
        ]
    }
};

function updateSpeakerOptions(apiName) {
    const speakers = apiConfig[apiName].speakers;
    const speakerSelect = $('#speaker');
    speakerSelect.empty();
    speakers.forEach(speaker => {
        speakerSelect.append(new Option(speaker, speaker));
    });

    const showAdditionalParams = apiName === 'leftsite';
    $('#leftsiteParams').toggle(showAdditionalParams);
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
    // 更新所选 API 的讲述人选项
    $('#api').on('change', function () {
        updateSpeakerOptions(this.value);
    });

    // 设置初始的讲述人选项
    updateSpeakerOptions('aivoicenet');

    // 初始化语速和语调滑块
    updateSliderLabel('rate', 'rateValue');
    updateSliderLabel('pitch', 'pitchValue');

    $('#text2voice-form').on('submit', function (event) {
        event.preventDefault();

        const apiName = $('#api').val();
        const apiUrl = apiConfig[apiName].url;
        const speaker = $('#speaker').val();
        const text = $('#text').val();
        let url = `${apiUrl}?text=${encodeURIComponent(text)}&speak=${speaker}`;

        if (apiName === 'leftsite') {
            const rate = $('#rate').val();
            const pitch = $('#pitch').val();
            url += `&r=${rate}&p=${pitch}&o=audio-24khz-48kbitrate-mono-mp3`;
        }

        $('#loading').show();
        $('#result').hide();

        $.ajax({
            url: url,
            method: 'GET',
            success: function (response) {
                let voiceUrl;
                if (apiName === 'aivoicenet') {
                    voiceUrl = response.voiceurl;
                } else {
                    voiceUrl = url;
                }

                $('#audio').attr('src', voiceUrl);
                $('#download').attr('href', voiceUrl);
                $('#result').show();
                addHistoryItem(text, voiceUrl);  // 添加到历史记录
                $('#loading').hide();
            },
            error: function () {
                alert('请求失败，请检查网络连接');
                $('#loading').hide();
            }
        });
    });
});

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
    const audioSource = $('#audioSource');
    audioSource.attr('src', audioURL);

    const audioElement = $('#audioPlayer audio')[0];
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
}
