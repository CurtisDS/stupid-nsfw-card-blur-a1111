const nsfwh = {
	currentViewOption: "Hide",
	uiLoaded: false,
	defaultOptSet: false,
	attributesAdded: false,
	setAttributes: () => {
		let extraNetworkTabs = gradioApp().querySelectorAll("#txt2img_extra_tabs, #img2img_extra_tabs");
		if(typeof extraNetworkTabs != "undefined" && extraNetworkTabs != null && extraNetworkTabs.length > 0) {
			extraNetworkTabs.forEach(extraNetworkTab => {
				extraNetworkTab.setAttribute("nsfw-setting", nsfwh.currentViewOption)
			});
		}
		nsfwh.attributesAdded = true;
	},
	extraNetworksControlNSFWModalOpenOnClick: (event) => {
		let sibling = event.currentTarget.nextElementSibling;
		if(sibling.hasAttribute("modal-open")) {
			if(sibling.getAttribute("modal-open") === "true") {
				sibling.style.display = 'none';
				sibling.setAttribute("modal-open", "false");
			} else {
				sibling.style.display = 'grid';
				sibling.setAttribute("modal-open", "true");
			}
		}
	},
	extraNetworksControlNSFWModalCloseOnClick: (event) => {
		event.currentTarget.parentNode.style.display = 'none';
		event.currentTarget.parentNode.setAttribute("modal-open", "false");
	},
	extraNetworksControlNSFWBlurOnClick: (event) => {
		event.currentTarget.parentNode.style.display = 'none';
		event.currentTarget.parentNode.setAttribute("modal-open", "false");
		nsfwh.currentViewOption = "Blur";
		nsfwh.setAttributes();
	},
	extraNetworksControlNSFWHideOnClick: (event) => {
		event.currentTarget.parentNode.style.display = 'none';
		event.currentTarget.parentNode.setAttribute("modal-open", "false");
		nsfwh.currentViewOption = "Hide";
		nsfwh.setAttributes();
	},
	extraNetworksControlNSFWShowOnClick: (event) => {
		event.currentTarget.parentNode.style.display = 'none';
		event.currentTarget.parentNode.setAttribute("modal-open", "false");
		nsfwh.currentViewOption = "Show";
		nsfwh.setAttributes();
	}
}

/**
 * Register callback to be called when the UI is updated.
 * The callback receives no arguments.
 */
 onAfterUiUpdate(function() {
	if(nsfwh.uiLoaded) return;
	let extraNetworkTabsControls = document.querySelectorAll("#txt2img_extra_tabs > .tab-nav > .extra-networks-controls-div > .extra-network-control:not([nsfw-hijack]), #img2img_extra_tabs > .tab-nav > .extra-networks-controls-div > .extra-network-control:not([nsfw-hijack])");
	if(typeof extraNetworkTabsControls != "undefined" && extraNetworkTabsControls != null && extraNetworkTabsControls.length > 0) {
		extraNetworkTabsControls.forEach(extraNetworkTabsControl => {
			// Add button to show/hide/blur NSFW cards

			// Create the menu button
			let viewMenu = document.createElement('div');
			viewMenu.className = 'extra-network-control--nsfw extra-network-control--enabled nsfw-menu-button';
			viewMenu.title = `Change NSFW Filter`;
			viewMenu.onclick = (event) => nsfwh.extraNetworksControlNSFWModalOpenOnClick(event);
			const viewMenuIcon = document.createElement('i');
			viewMenuIcon.className = 'extra-network-control--icon extra-network-control--nsfw-icon';
			viewMenu.appendChild(viewMenuIcon);


			// Create the modal view menu div
			const modalDiv = document.createElement('div');
			modalDiv.className = "nsfw-modal-div";
			modalDiv.setAttribute("modal-open","false");

			// Create the second child div (Blur NSFW)
			const blurNsfwDiv = document.createElement('div');
			blurNsfwDiv.title = "Blur NSFW";
			blurNsfwDiv.className = "extra-network-control--nsfw nsfw-blur";
			blurNsfwDiv.onclick = (event) => nsfwh.extraNetworksControlNSFWBlurOnClick(event);
			const blurNsfwIcon = document.createElement('i');
			blurNsfwIcon.className = "extra-network-control--icon extra-network-control--nsfw-icon";
			blurNsfwDiv.appendChild(blurNsfwIcon);

			// Create the first child div (Hide NSFW)
			const hideNsfwDiv = document.createElement('div');
			hideNsfwDiv.title = "Hide NSFW";
			hideNsfwDiv.className = "extra-network-control--nsfw nsfw-hide";
			hideNsfwDiv.onclick = (event) => nsfwh.extraNetworksControlNSFWHideOnClick(event);
			const hideNsfwIcon = document.createElement('i');
			hideNsfwIcon.className = "extra-network-control--icon extra-network-control--nsfw-icon";
			hideNsfwDiv.appendChild(hideNsfwIcon);

			// Create the third child div (Show NSFW)
			const showNsfwDiv = document.createElement('div');
			showNsfwDiv.title = "Show NSFW";
			showNsfwDiv.className = "extra-network-control--nsfw nsfw-show";
			showNsfwDiv.onclick = (event) => nsfwh.extraNetworksControlNSFWShowOnClick(event);
			const showNsfwIcon = document.createElement('i');
			showNsfwIcon.className = "extra-network-control--icon extra-network-control--nsfw-icon";
			showNsfwDiv.appendChild(showNsfwIcon);

			// Create the fourth child div (clear div)
			const clearDiv = document.createElement('div');
			clearDiv.className = "nsfw-modal-div-clear";
			clearDiv.onclick = (event) => nsfwh.extraNetworksControlNSFWModalCloseOnClick(event);

			// Append all child divs to the parent div
			modalDiv.appendChild(blurNsfwDiv);
			modalDiv.appendChild(hideNsfwDiv);
			modalDiv.appendChild(showNsfwDiv);
			modalDiv.appendChild(clearDiv);


			// Prepend the modal menu div and the menu button to the control div
			extraNetworkTabsControl.prepend(modalDiv);
			extraNetworkTabsControl.prepend(viewMenu);

			// Set the attribute so we know this is done
			extraNetworkTabsControl.setAttribute("nsfw-hijack","");
		});

		if(nsfwh.defaultOptSet && !nsfwh.attributesAdded) {
			nsfwh.setAttributes();
		}
		nsfwh.uiLoaded = true;
	}
});

/**
 * Register callback to be called when the options (in opts global variable) are available.
 * The callback receives no arguments.
 * If you register the callback after the options are available, it's just immediately called.
 */
if(typeof onOptionsAvailable === "function") {
	onOptionsAvailable(initNSFWSettings);
} else {
	// Fallback if onOptionsAvailable isn't available
	const checkInterval = setInterval(() => {
		if (typeof opts !== "undefined" && Object.keys(opts).length > 0) {
			clearInterval(checkInterval);
			initNSFWSettings();
		}
	}, 100); // Check every 100 milliseconds
}

function initNSFWSettings() {
	const defaultViewOption = opts["nsfw_card_blur_default"];

	if(defaultViewOption === "Blur" || defaultViewOption === "Show" || defaultViewOption === "Hide") {
		nsfwh.currentViewOption = defaultViewOption;
	}

	nsfwh.defaultOptSet = true;
	
    if(!nsfwh.attributesAdded) {
		nsfwh.setAttributes();
	}
}