$(document).ready(function () {
    $('#text2voice-form').on('submit', function (event) {
        event.preventDefault();

        const speaker = $('#speaker').val();
        const text = $('#text').val();
        const params = new URLSearchParams({ speak: speaker, text: text });

        $('#loading').show();
        $('#result').hide();

        $.ajax({
            url: `https://api.pearktrue.cn/api/aivoice/?${params.toString()}`,
            method: 'GET',
            success: function (data) {
                if (data.code === 200) {
                    $('#audio').attr('src', data.voice);
                    $('#download').attr('href', data.voice);
                    $('#result').show();
                } else {
                    alert('生成失败，请重试');
                }

                $('#loading').hide();
            },
            error: function () {
                alert('请求失败，请检查网络连接');
                $('#loading').hide();
            }
        });
    });
});
