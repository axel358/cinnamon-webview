#!/bin/python3
import gi
import sys

gi.require_version("Gtk", "3.0")
gi.require_version("WebKit2", "4.0")
from gi.repository import Gtk, WebKit2

window = Gtk.Window()
window.connect("destroy", Gtk.main_quit)
window.set_decorated(False)
window.set_position(Gtk.WindowPosition.MOUSE)
window.set_default_size(350, 450)
main_box = Gtk.Box(orientation=Gtk.Orientation.VERTICAL)
header_box = Gtk.Box(orientation=Gtk.Orientation.HORIZONTAL)
main_box.add(header_box)
scrolled_window = Gtk.ScrolledWindow()
scrolled_window.set_vexpand(True)
webview = WebKit2.WebView()
webview.load_uri(sys.argv[2])
scrolled_window.add(webview)
main_box.add(scrolled_window)
close_button = Gtk.Button.new_from_icon_name("close-symbolic", Gtk.IconSize.BUTTON)
close_button.set_halign(Gtk.Align.END)
close_button.connect("clicked", Gtk.main_quit)
close_button.get_style_context().add_class("flat")
title_label = Gtk.Label(label=sys.argv[1])
title_label.set_hexpand(True)
header_box.add(title_label)
header_box.add(close_button)
window.add(main_box)
window.set_icon(Gtk.IconTheme.get_default().load_icon("applications-internet", 64, 0))
window.show_all()
Gtk.main()