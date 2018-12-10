function ncinitpc() {
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
                            document.getElementById("nc-session-id").value = data.csessionid;
                            document.getElementById("nc-sig").value = data.sig;
                            document.getElementById("nc-verify-form").submit();
                        }
                    });
                }