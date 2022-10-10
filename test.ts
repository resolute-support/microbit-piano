// tests go here; this will not be compiled when this package is used as an extension.
basic.clearScreen()
Piano.TP_ShowRGB_single(RGB_LED.LED_1, 0)
Piano.TP_ShowRGB_single(RGB_LED.LED_2, 0)
Piano.TP_ShowRGB_single(RGB_LED.LED_3, 0)
Piano.TP_ShowRGB_single(RGB_LED.LED_4, 0)
basic.pause(100)
for (let i = 0; i < 5; i++) {
    Piano.TP_ShowRGB_single(RGB_LED.LED_1, Piano.TP_SetColor(RGB_COLOR.RED))
    basic.pause(100)
    Piano.TP_ShowRGB_single(RGB_LED.LED_2, Piano.TP_SetColor(RGB_COLOR.GREEN))
    basic.pause(100)
    Piano.TP_ShowRGB_single(RGB_LED.LED_3, Piano.TP_SetColor(RGB_COLOR.BLUE))
    basic.pause(100)
    Piano.TP_ShowRGB_single(RGB_LED.LED_4, Piano.TP_SetColor(RGB_COLOR.YELLOW))
    basic.pause(100)
    Piano.TP_ShowRGB_single(RGB_LED.LED_1, 0)
    Piano.TP_ShowRGB_single(RGB_LED.LED_2, 0)
    Piano.TP_ShowRGB_single(RGB_LED.LED_3, 0)
    Piano.TP_ShowRGB_single(RGB_LED.LED_4, 0)
    basic.pause(100)
}
basic.showIcon(IconNames.Happy)

basic.forever(function() {
    Piano.TP_PlayPiano()
})