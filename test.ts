// tests go here; this will not be compiled when this package is used as an extension.

basic.forever(function() {
    Piano.TP_ShowRGB_single(0, 10000)
    basic.pause(100)
    Piano.TP_ShowRGB_single(1, 10000)
    basic.pause(100)
    Piano.TP_ShowRGB_single(2, 10000)
    basic.pause(100)
    Piano.TP_ShowRGB_single(3, 10000)
    basic.pause(100)
    for (let i = 0; i < 5; i++) {
        Piano.TP_ShowRGB_single(i, 0);
    }
    basic.pause(100)
})