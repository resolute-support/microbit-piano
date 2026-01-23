/**
 * The piano key corresponds to the touch screen TPvalue.
 */
enum PIANO {
    None = 0,
    C = 1,        // 0000 0000 0000 0001
    Db = 2,       // 0000 0000 0000 0010
    D = 4,        // 0000 0000 0000 0100
    Eb = 8,       // 0000 0000 0000 1000

    E = 16,       // 0000 0000 0001 0000
    F = 32,       // 0000 0000 0010 0000
    Gb = 64,      // 0000 0000 0100 0000
    G = 128,      // 0000 0000 1000 0000

    Ab = 256,     // 0000 0001 0000 0000
    A = 512,      // 0000 0010 0000 0000
    Bb = 1024,    // 0000 0100 0000 0000
    B = 2048,     // 0000 1000 0000 0000

    C1 = 4096     // 0001 0000 0000 0000
}

/**
 * RGBLED order.
 */
enum RGB_LED {
    LED_1 = 0,
    LED_2 = 1,
    LED_3 = 2,
    LED_4 = 3,
}

/**
 * Well known colors for a NeoPixel strip
 */
enum RGB_COLOR {
    //% block=red
    RED = 0xFF0000,
    //% block=orange
    ORANGE = 0xFFA500,
    //% block=yellow
    YELLOW = 0xFFFF00,
    //% block=green
    GREEN = 0x00FF00,
    //% block=blue
    BLUE = 0x0000FF,
    //% block=indigo
    INDIGO = 0x4b0082,
    //% block=violet
    VIOLET = 0x8a2be2,
    //% block=purple
    PURPLE = 0xFF00FF,
    //% block=white
    WHITE = 0xFFFFFF
}

/**
 * Operate the function of the piano board.
 */
//% weight=20 color=#3333FF icon="\uf001"
namespace Piano {
    let strip = neopixel.create(DigitalPin.P1, 4, NeoPixelMode.RGB);

    export function getPianoReading(): number {

        pins.i2cWriteNumber(0x50, 8, NumberFormat.Int8LE, false);

        let piano2Value = pins.i2cReadNumber(0x57, NumberFormat.UInt16BE, false);
        let piano1Value = pins.i2cReadNumber(0x50, NumberFormat.Int16LE, false);

        let TPval = 0;

        if (piano1Value != 0) {
            TPval = piano1Value;
        } else {
            TPval = ((piano2Value & 0xFF) << 8) | ((piano2Value >> 8) & 0xFF);
        }

        return TPval;
    }




    //% blockId=tp_press 
    //% block="Key|%index|is pressed"
    //% weight=100
    export function Press(index: PIANO): boolean {
        let TPval = getPianoReading();

        if (TPval != PIANO.None) {
            if (index != 0) {
                return (TPval & index) !== 0;
            } else {
                return TPval === PIANO.None;
            }
        }
        return false;
    }

    /**
    * Gets the RGB TPvalue of a known color
    */
    //% blockId="SetColor" block="%Color"
    //% weight=90 blockGap=8
    export function SetColor(Color: RGB_COLOR): number {
        return Color;
    }

    /**
    * Set RGB Color
    */
    //% weight=85
    //% blockId="SetRGB" block="R %red|G %green|B %blue"
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    export function SetRGB(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    function SetRandomRGB(): number {
        let R = Math.round(Math.random() * 256);
        let G = Math.round(Math.random() * 256);
        let B = Math.round(Math.random() * 256);
        return SetRGB(R, G, B);
    }

    function ShowRGB(LED1: number, LED2: number, LED3: number, LED4: number): void {
        strip.setPixelColor(0, LED1);
        strip.setPixelColor(1, LED2);
        strip.setPixelColor(2, LED3);
        strip.setPixelColor(3, LED4);
        strip.show();
    }

    /**
     * Display 4 RGB color.
     * @param COLOR [0-65535] LED1 color; eg: 10000, 65535
    */
    //% blockId=ShowRGB_single
    //% block="Set |%RGB_LED|COLOR %10000"
    //% weight=80
    //% COLOR.min=0
    export function ShowRGB_single(RGB_LED: RGB_LED, COLOR:number): void {
        strip.setBrightness(100);
        strip.setPixelColor(RGB_LED, COLOR);
        strip.show();
    }

    /**
     * Trun OFF RGB LED.
     *
    */
    //% blockId=Off_single
    //% block="Turn off RGB LED |%RGB_LED"
    //% weight=80
    //% COLOR.min=0
    export function Off_single(RGB_LED: RGB_LED): void {
        strip.setBrightness(100);
        strip.setPixelColor(RGB_LED, 0);
        strip.show();
    }

    /**
     * Plays a tone through pin ``P0`` for the given duration.
     * @param frequency pitch of the tone to play in Hertz (Hz)
     * @param ms tone duration in milliseconds (ms)
     */
    //% help=music/play-tone 
    //% weight=70
    //% blockId=PlayMusic block="Play |Music %note=device_note|for %duration=device_beat" blockGap=8
    //% parts="headphone"
    //% useEnumTPval=1
    export function PlayMusic(frequency: number, ms: number): void {
        pins.analogPitch(frequency, ms);
    }

    let play = 0;
    /**
    * Play the Piano
    */
    //% blockId=PlayPiano" block="Play Piano"
    //% weight=60    
    export function PlayPiano(): void {
        let TPval = getPianoReading();

        if ((TPval & play) !== 0) {
            TPval = TPval & play;
        } else if (TPval & PIANO.C) {
            showRandomColors();
            music.ringTone(262);
        } else if (TPval & PIANO.Db) {
            showRandomColors();
            music.ringTone(277);
        } else if (TPval & PIANO.D) {
            showRandomColors();
            music.ringTone(294);
        } else if (TPval & PIANO.Eb) {
            showRandomColors();
            music.ringTone(311);
        } else if (TPval & PIANO.E) {
            showRandomColors();
            music.ringTone(330);
        } else if (TPval & PIANO.F) {
            showRandomColors();
            music.ringTone(349);
        } else if (TPval & PIANO.Gb) {
            showRandomColors();
            music.ringTone(370);
        } else if (TPval & PIANO.G) {
            showRandomColors();
            music.ringTone(392);
        } else if (TPval & PIANO.Ab) {
            showRandomColors();
            music.ringTone(415);
        } else if (TPval & PIANO.A) {
            showRandomColors();
            music.ringTone(440);
        } else if (TPval & PIANO.Bb) {
            showRandomColors();
            music.ringTone(466);
        } else if (TPval & PIANO.B) {
            showRandomColors();
            music.ringTone(494);
        } else if (TPval & PIANO.C1) {
            showRandomColors();
            music.ringTone(523);
        } else if (TPval === PIANO.None) {
            ShowRGB(0, 0, 0, 0);
            music.ringTone(0);
        }

        if (TPval !== 0xffff) {
            play = TPval;
        }
    }

    function showRandomColors(): void {
        ShowRGB(SetRandomRGB(), SetRandomRGB(), SetRandomRGB(), SetRandomRGB());
    }

    /**
     * Set volume for buzzer
     * 
    */
    //% blockId=Volume
    //% block="Set Volume| %VOLUME"
    //% VOLUME.min=0 VOLUME.max=255
    //% weight=80
    export function Volume(VOLUME: number): void {
        music.setVolume(VOLUME)
    }

    /**
     * Turn Buzzer OFF
     * 
    */
    //% blockId=Quiet
    //% block="stop all sounds"
    //% weight=80
    export function Quiet(): void {
        music.stopAllSounds()
    }
}
