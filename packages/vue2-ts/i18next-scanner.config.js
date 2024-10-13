module.exports = {
    input: [
        'src/**/*.{ts,js,jsx,vue}',
    ],
    options: {
        debug:true,
        removeUnusedKeys:true,
        attr: {
            list: ["\\$t"],
            extensions: [".vue", ".htm",".ts"]
        },
        func: {
            list: ["\\$t","i18n"],
            extensions: [".vue",".ts"]
        },
        lngs: ["en", "zh-cn", "zh-hk"],
        defaultLng: 'zh-cn',
        ns: ["main"],
        defaultNs: "main",
        defaultValue: "",
        resource: {
            loadPath: "src/i18n/{{lng}}/{{ns}}.json",
            savePath: "src/i18n/{{lng}}/{{ns}}.json"
        },
        nsSeparator: ":",
        keySeparator: false,
        interpolation: {
            prefix: "{{",
            suffix: "}}"
        }
    }
};
