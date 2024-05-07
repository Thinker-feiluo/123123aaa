interface fontWeightType {
    Family: '宋体' | '黑体' | '微软雅黑' | '微软正黑体' | '新宋体' | '新细明体' | '细明体' | '标楷体' | '仿宋' | '楷体' | '仿宋_GB2312' | '楷体_GB2312'
    Weight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
    WeightBold: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
    theme: {
        Cursor: 'grey' | 'red' | 'green' | 'yellow' | 'blue' | 'pink',
        Foreground: 'grey' | 'red' | 'green' | 'yellow' | 'blue' | 'pink',
        Background: 'grey' | 'red' | 'green' | 'yellow' | 'blue' | 'pink',
    },
    CursorStyle: 'block' | 'underline' | 'bar'
}

export default function (Size?: number, Family?: fontWeightType['Family'], Weight?: fontWeightType['Weight'], WeightBold?: fontWeightType['WeightBold'], letterSpacing?: number, lineHeight?: number, cursor?: fontWeightType['theme']['Cursor'], foreground?: fontWeightType['theme']['Foreground'], background?: fontWeightType['theme']['Background'], cursorStyle?: fontWeightType['CursorStyle'], cursorWidth?: number) {
    return {
        rendererType: 'dom',
        disableStdin: false,
        fontSize: Size || 16,
        fontFamily: Family || '宋体',
        fontWeight: Weight || '700',
        fontWeightBold: WeightBold || '700',
        letterSpacing: letterSpacing || 0,
        lineHeight: lineHeight || 1,
        theme: {
            cursor: cursor || 'grey',
            cursorAccent: cursor || 'grey',
            foreground: foreground || 'white',
            background: background || 'black',
        },
        convertEol: true,
        cursorBlink: true,
        cursorStyle: cursorStyle || 'block',
        cursorWidth: cursorWidth || 2,

    }
}

