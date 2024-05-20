
function get_checkbox_tree() {
    return {
        "tuftsall" : ["tuftscscore", "tuftscselectives", "tuftsbme", "tuftsmath", "tuftshass", 
                        "f20all", "s21all", "f21all", "s22all", "su22all", "f22all", "s23all", "f23all", "s24all"],
        "chsall" : ["chseng", "chsss", "chsns", "chsmath", "chslat", "chsmus", "chspe", "chsmisc",
                    "f16all", "f17all", "f18all", "f19all"],
        "tuftscscore" : ["comp11", "comp15", "comp61", "cs40", "cs160", "cs105", "cs170", "cs97", "cs98"],
        "tuftscselectives" : ["comp93", "cs4", "cs167", "cs116", "es2", "cs121", "cs135", "cs111", "cs115",
                                "cs107", "cs117", "cs138", "cs169", "cs114", "cs120", "cs151-02", "cs151-03"],
        "tuftsbme" : ["bio13", "bme12", "bme131", "phy12", "bme162", "bme10", "bme100"],
        "tuftsmath" : ["math42", "math70", "es56", "math51"],
        "tuftshass" : ["psy13", "mus69", "phil24", "spn1", "ed11", "psy11"],
        "chseng" : ["wl1", "wl2", "aplang", "aplit"],
        "chsss" : ["mwh", "apush", "apgov", "appsych"],
        "chsns" : ["bio", "chem", "apchem", "apphys", "apbio"],
        "chsmath" : ["geo", "alg2", "ma", "apcsp", "apcalc", "apcsa"],
        "chslat" : ["lat2", "lat3", "aplat", "lat5"],
        "chsmus" : ["f16crus", "cbnd", "f16mbnd", "f17crus", "f17wbnd", "f17mbnd", "f18crus", "f18wbnd",
                    "f18mbnd", "vips", "f19mbnd"],
        "chspe" : ["f16pe", "f16hlth", "f17pe", "f18pe", "f18hlth", "f19pe"],
        "chsmisc" : ["persf", "gamed"],
        "f16all" : ["mwh", "geo", "lat2", "wl1", "f16crus", "cbnd", "bio", "f16pe", "f16hlth", "f16mbnd"],
        "f17all" : ["f17pe", "chem", "alg2", "apush", "persf", "gamed", "f17crus", "f17wbnd", "f17mbnd", 
                    "wl2", "lat3"],
        "f18all" : ["apphys", "f18pe", "f18hlth", "apgov", "ma", "aplat", "f18crus", "f18wbnd", "f18mbnd",
                    "apcsp", "aplang", "apchem"],
        "f19all" : ["apcsa", "vips", "aplit", "apcalc", "f19pe", "apbio", "lat5", "appsych", "f19mbnd"],
        "f20all" : ["bio13", "psy13", "math42", "comp11", "mus69", "comp93"],
        "s21all" : ["phil24", "bme12", "bme131", "comp15", "comp61", "math70"],
        "f21all" : ["phy12", "cs40", "cs160", "es56", "cs4"],
        "s22all" : ["bme162", "cs167", "cs105", "cs116", "es2"],
        "su22all" : ["spn1"],
        "f22all" : ["ed11", "bme10", "cs97", "cs121", "cs135", "cs170"],
        "s23all" : ["psy11", "bme100", "cs98", "cs111", "cs115", "math51"],
        "f23all" : ["cs107", "cs117", "cs138", "cs169"],
        "s24all" : ["cs114", "cs120", "cs151-02", "cs151-03"],
        "otherall" : ["ra", "ta15", "ta40", "pokegeo"]
    }
}

function get_quiz_lengths() {
    return {
        "mwh" : 10,
        "geo" : 10,
        "lat2" : 10,
        "wl1" : 10,
        "f16crus" : 10,
        "cbnd" : 10,
        "bio" : 10,
        "f16pe" : 10,
        "f16hlth" : 10,
        "f16mbnd" : 10,
        "f17pe" : 10,
        "chem" : 10,
        "alg2" : 10,
        "apush" : 10,
        "persf" : 10,
        "gamed" : 10,
        "f17crus" : 10,
        "f17wbnd" : 5,
        "f17mbnd" : 5,
        "wl2" : 10,
        "lat3" : 10,
        "apphys" : 10,
        "f18hlth" : 5,
        "f18pe" : 5,
        "apgov" : 10,
        "ma" : 10,
        "aplat" : 10,
        "f18crus" : 10,
        "f18wbnd" : 5,
        "f18mbnd" : 5,
        "apcsp" : 10,
        "aplang" : 10,
        "apchem" : 10,
        "apcsa" : 10,
        "vips" : 10,
        "aplit" : 10,
        "apcalc" : 10,
        "f19pe" : 10,
        "apbio" : 10,
        "lat5" : 10,
        "appsych" : 10,
        "f19mbnd" : 10,
        "bio13" : 25,
        "psy13" : 15,
        "math42" : 15,
        "comp11" : 20,
        "mus69" : 10,
        "comp93" : 5,
        "phil24" : 20,
        "bme12" : 15,
        "bme131" : 15,
        "comp15" : 20,
        "comp61" : 15,
        "math70" : 15,
        "phy12" : 10,
        "cs40" : 25,
        "cs160" : 20,
        "es56" : 20,
        "cs4" : 5,
        "bme162" : 15,
        "cs167" : 15,
        "cs105" : 25,
        "cs116" : 15,
        "es2" : 20,
        "spn1" : 15,
        "ed11" : 15,
        "bme10" : 15,
        "cs97" : 15,
        "cs121" : 15,
        "cs135" : 15,
        "cs170" : 15,
        "psy11" : 15,
        "bme100" : 15,
        "cs98" : 15,
        "cs111" : 15,
        "cs115" : 15,
        "math51" : 20,
        "cs107" : 15,
        "cs117" : 15,
        "cs138" : 15,
        "cs169" : 15,
        "cs114" : 15,
        "cs120" : 15,
        "cs151-02" : 15,
        "cs151-03" : 15,
        "ra" : 14,
        "ta15" : 10,
        "ta40" : 20,
        "pokegeo" : 30
    }
}

function get_config_categories() {
    return ["f16configure", "f17configure", "f18configure", "f19configure", "f20configure", "s21configure",
            "f21configure", "s22configure", "su22configure", "f22configure", "s23configure", "f23configure", 
            "s24configure", "otherconfigure"];
}

