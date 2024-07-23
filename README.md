# Stupid NSFW Card Blur

This extension is a relatively light weight extension that doesn't do any analysis on any actual images. It does not blur or hide any NSFW images that are generated. It is only intended to blur or hide images from the extra network tab model cards and it will only do so if the path to the image preview contains the text "nsfw" somewhere in the path.

If you use the "Blur" setting you can hover over the model card to unblur the thumbnail. If you use the "Hide" setting it will remain hidden even when hovering.

## Setup:

For the most simple setup of how to use this extension:

1. In your model folder create a subfolder called "nsfw" (do this for your models, embeddings, lora, and hypernetwork folders)
2. Move any models that you want to have the thumbnails blurred/hidden along with their preview images into these folders

Again this extension is not doing anything smart, it is just looking for the string "nsfw" inside the `src` attribute of the image tag. By moving the models into a folder named "nsfw" this ensures that the string will be present in the `src` attribute.

If the model contains nsfw in the model file name this will also cause the thumbnails to be blurred or hidden without needing to move the model.

## New UI Button:

A button has been added to the `Extra Networks` controls area to allow you to change between "Blur" "Hide" or "Show". Using these buttons will not permanently change the default setting. To do that you will need to update the default setting in the `Settings` tab.

![image](https://github.com/user-attachments/assets/5b8d84eb-33eb-4183-9035-819ae91cc545)

This is what it looks like depending on the setting:

## Blur:
***Note:*** *hovering over the card will unblur the image*

![image](https://github.com/user-attachments/assets/9c1bb440-18c0-490a-8113-415302410ee7)

## Hide:
***Note:*** *hovering over the card will *NOT* show the image*

![image](https://github.com/user-attachments/assets/5ca81257-68d5-4c29-bac5-f3f60199f790)

## Show:

![image](https://github.com/user-attachments/assets/d86af94c-4cb8-4a6e-986c-0c75548b457e)
