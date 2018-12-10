
                var isMobile = navigator.userAgent.match(/.*(iPhone|iPad|Android|ios|SymbianOS|Windows Phone).*/i);
                var language = navigator.language.toLocaleLowerCase();

                var pc_language = {
                    //PcWeb
                    _startTEXT: 'Please slide to verify',
                    _yesTEXT: 'Verified',
                    _Loading: 'Loading',
                    _error300: "Oops... something\'s wrong. Please <a href=\"javascript:__nc.reset()\">refresh</a> and try again.",
                    _errorNetwork: "Net Err. Please <a href=\"javascript:__nc.reset()\">refresh</a>",
                }
                var h5_language = {
                    //html5
                    'LOADING': "Loading...",
                    'SLIDER_LABEL': 'Slide to verify',
                    'CHECK_Y': 'Verified',
                    'ERROR_TITLE': 'Sorry, something wrong',
                    'ERROR_RELOAD': 'Reload',
                    'ERROR_FEEDBACK': 'Feedback'
                }
                var start_language = {
                    vi: "Vui lòng kéo sang phải để xác nhận",
                    id: "Geser untuk verifikasi",
                    th: "โปรดเลื่อนเพื่อยืนยัน",
                    ms: "Sila leret untuk teruskan."
                }
                try {
                    start_language["vi-VN"] = start_language["vi"];
                    start_language["id-ID"] = start_language["id"];
                    start_language["th-TH"] = start_language["th"];
                    start_language["ms-BN"] = start_language["ms"];
                    start_language["ms-MY"] = start_language["ms"];
                    pc_language["_startTEXT"] = start_language[language] || pc_language["_startTEXT"];
                    h5_language["SLIDER_LABEL"] = start_language[language] || h5_language["SLIDER_LABEL"];
                }
                catch (e) {
                    console && console.log('e')
                }
                var loadScript = function (src, callback) {
                    var script = document.createElement('script'),
                        head = document.getElementsByTagName('head')[0];
                    script.type = 'text/javascript';
                    script.charset = 'UTF-8';
                    script.src = src;
                    if (script.addEventListener) {
                        script.addEventListener('load',
                            function () {
                                callback();
                            },
                            false);
                    } else if (script.attachEvent) {
                        script.attachEvent('onreadystatechange',
                            function () {
                                var target = window.event.srcElement;
                                if (target.readyState == 'loaded') {
                                    callback();
                                }
                            });
                    }
                    head.appendChild(script);
                };
                var scene = "";
                if (isMobile) {
                    scene = "register_h5";
                    loadScript('//g.alicdn.com/sd/nch5/index.js', ncinit);
                } else {
                    scene = "register";
                    loadScript('//g.alicdn.com/sd/ncpc/nc.js', ncinitpc);
                }
                function ncinitpc() {
                    console.log('vap day 1');
                    UA_Opt.Flag = 880846;
                    document.getElementById("nocaptcha").style.cssText = "margin-top:-10px";
                    (new noCaptcha({})).upLang(language, pc_language);
                    noCaptcha({
                        renderTo: "#nocaptcha",
                        appkey: "X82Y",
                        token: "fe5f9a347a3da5990dccebd4fad31f6e",
                        scene: scene,
                        language: language,
                        is_Opt: 1,
                        callback: function (data) {
                            console.log(data);
                            document.getElementById("nc-session-id").value = data.csessionid;
                            document.getElementById("nc-sig").value = data.sig;
                            document.getElementById("nc-verify-form").submit();
                        }
                    });
                }
                function ncinit() {
                    console.log('vao day 2');
                    UA_Opt.Flag = 880846;
                    NoCaptcha.upLang(language, h5_language);

                    NoCaptcha.init({
                        renderTo: "#nocaptcha",
                        appkey: "X82Y",
                        token: "fe5f9a347a3da5990dccebd4fad31f6e",
                        scene: scene,
                        language: language,
                        is_Opt: 1,
                        callback: function (data) {
                            console.log(data);
                            document.getElementById("nc-session-id").value = data.csessionid;
                            document.getElementById("nc-sig").value = data.sig;
                            document.getElementById("nc-verify-form").submit();
                        }
                    });
                    NoCaptcha.setEnabled(true);
                }


                noCaptcha({
                        renderTo: "#nocaptcha",
                        appkey: "X82Y",
                        token: "fe5f9a347a3da5990dccebd4fad31f6e",
                        scene: scene,
                        language: language,
                        is_Opt: 1,
                        callback: function (data) {
                            console.log(data);
                            console.log('dkm');
                            document.getElementById("nc-session-id").value = data.csessionid;
                            document.getElementById("nc-sig").value = data.sig;
                            document.getElementById("nc-verify-form").submit();
                        }
                    });