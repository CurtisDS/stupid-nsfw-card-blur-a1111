import gradio as gr # type: ignore
from modules import script_callbacks, shared # type: ignore

def on_ui_settings():
	section = ('nsfw_card_blur', "NSFW Card Blur")
	shared.opts.add_option("nsfw_card_blur_default", shared.OptionInfo("Blur", "Default NSFW filter setting", gr.Radio, {"choices": ["Blur", "Hide", "Show"]}, section=section))

script_callbacks.on_ui_settings(on_ui_settings)