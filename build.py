import subprocess
import shutil

__SCRIPT_VERSION__ = "1.0.1"

top = """// ==UserScript==
// @name        Moodle Suite
// @namespace   http://userscripts.org/users/392674
// @description Suite per al Moodle
// @include     *://noumoodle.bernatelferrer.cat/*
// @include     *://192.168.0.9/*
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @version     {ver}
// @grant       none
// ==/UserScript==

""".format(ver=__SCRIPT_VERSION__)

browserify_output = subprocess.check_output(
    [
        "C:/Users/Gcq/AppData/Roaming/npm/browserify.cmd",
        "src/main.js"
    ],
    universal_newlines=True
)

with open("msuite.user.js", "w") as f:
    f.write(top)
    f.write(browserify_output)

shutil.copy(
    "msuite.user.js",
    (
        "C:/Users/Gcq/AppData/Roaming/Mozilla/Firefox/Profiles/"
        "1vrv1sxx.default-1385151951570/gm_scripts/Moodle_Suite/msuite.user.js"
    )
)
