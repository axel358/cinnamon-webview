const Applet = imports.ui.applet;
const Main = imports.ui.main;
const Lang = imports.lang;
const St = imports.gi.St;
const Settings = imports.ui.settings;
const Util = imports.misc.util;
const GLib = imports.gi.GLib;

class WebviewApplet extends Applet.IconApplet {

    constructor(metadata, orientation, panel_height, instance_id) {
        super(orientation, panel_height, instance_id);
        this.settings = new Settings.AppletSettings(this, "webview@axel358", instance_id);

        this.settings.bind("webpage", "webpage", this.on_settings_changed);
        this.settings.bind("title", "title", this.on_settings_changed);
        this.settings.bind("icon", "icon", this.update_icon);

        this.update_icon();

    }

    update_icon() {
        if (this.icon == "") {
            this.set_applet_icon_symbolic_name("web");
        } else {
            if (GLib.path_is_absolute(this.icon) && GLib.file_test(this.icon, GLib.FileTest.EXISTS)) {
                if (this.icon.search("-symbolic") != -1)
                    this.set_applet_icon_symbolic_path(this.icon);
                else
                    this.set_applet_icon_path(this.icon);
            } else {
                if (this.icon.search("-symbolic") != -1)
                    this.set_applet_icon_symbolic_name(this.icon);
                else
                    this.set_applet_icon_name(this.icon);
            }
        }
    }

    on_applet_clicked() {
        Util.spawnCommandLine(".local/share/cinnamon/applets/webview@axel358/window.py " + this.title + " " + this.webpage);
    }

    on_settings_changed() {

    }
}


function main(metadata, orientation, panel_height, instance_id) {
    return new WebviewApplet(metadata, orientation, panel_height, instance_id);
}
