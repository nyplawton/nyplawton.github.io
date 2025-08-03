const animationFrameRate = 45;

////////////////////////////////////
// Page Toggle //

// Properties //
const mains = document.querySelectorAll(".m");
const nav_costume = document.querySelectorAll(".nav--costume");
const nav_ritual = document.querySelectorAll(".nav--ritual");
const nav_symbolism = document.querySelectorAll(".nav--symbolism");
const nav_superstition = document.querySelectorAll(".nav--superstition");
const nav_resets = document.querySelectorAll(".nav--reset");

// Add event listeners to each nav element to show their respective main page
for (let i = 0; i < nav_costume.length; i++) {
    nav_costume[i].addEventListener("click", main_showCostume);
}
for (let i = 0; i < nav_ritual.length; i++) {
    nav_ritual[i].addEventListener("click", main_showRitual);
}
for (let i = 0; i < nav_symbolism.length; i++) {
    nav_symbolism[i].addEventListener("click", main_showSymbolism);
}
for (let i = 0; i < nav_superstition.length; i++) {
    nav_superstition[i].addEventListener("click", main_showSuperstition);
}

// Add reset function to every reset buttons
for (let i = 0; i < nav_resets.length; i++) {
    nav_resets[i].addEventListener("click", resetAllUI);
}

// Function Call //

// Function Declaration //

// Funcstion to open specific main page
function main_showCostume() {
    showMain("costume");
}
function main_showRitual() {
    showMain("ritual");
}
function main_showSymbolism() {
    showMain("symbolism");
}
function main_showSuperstition() {
    showMain("superstition");
}

// Hide every main content page
function disableAllMains() {

    for (const m of mains) {
        m.style.display = "none";
    }
}

// Show the specific page with the name <param> m_name </param>
function showMain(m_name) {

    // Hide every other page before showing the current one
    disableAllMains();

    let m = document.querySelector("#m-" + m_name);
    m.style.display = "block";
}
// -Page Toggle End- //


///////////////////////////////
// Button Behaviour //

// Properties //
const layout_card_img = document.querySelectorAll(".layout--card img");
const layout_card_a = document.querySelectorAll(".layout--card a");
const layout_card_hover_circleText = document.querySelectorAll(".layout--card .hover--circle-text");
const button_cancels = document.querySelectorAll(".button--cancel");
const body = document.querySelector("body");

const mSuperstiton_options = document.querySelectorAll(".m-superstition--option");
const mSuperstiton_option_descriptions = document.querySelectorAll(".m-superstition--option--description");
const mSuperstition_checkBox = document.querySelectorAll(".m-superstition--check-box");
const mRitual_interaction_button_circles = document.querySelectorAll(".m-ritual--interaction--button--circle");
const mRitual_interaction_content = document.querySelectorAll(".m-ritual--interaction--content");
const hamburger_lines = document.querySelectorAll(".hamburger--line");
const mobile_topNav_menu_list_li = document.querySelectorAll("#mobile--top-nav--menu--list li");

const mSuperstition_form_submitButton = document.querySelector("#m-superstition--form--submit-button");
const mSuperstition_form_result = document.querySelector("#m-superstition--form--result");
const mRitual_interaction_button_hollow_container = document.querySelector("#m-ritual--interaction--button--hollow--container");
const mRitual_interaction_contentButton = document.querySelector("#m-ritual--interaction--content-button");
const mRitual_interaction_topDropDown_h2 = document.querySelector("#m-ritual--interaction--top-drop-down h2");
const footer_form_div = document.querySelector("#footer--form div");
const footer_form_button_submit = document.querySelector("#footer--form--button--submit");
const footer_form_input_email = document.querySelector("#footer--form--input--email");
const footer_form_warning = document.querySelector("#footer--form--warning");
const topNav_right_toggleFullScreen = document.querySelector(".top-nav--right--toggle-full-screen");
const mobile_topNav_hamburger = document.querySelector("#mobile--top-nav--hamburger");
const mobile_topNav_menu = document.querySelector("#mobile--top-nav--menu");
const topNav_menu_background = document.querySelector("#top-nav--menu--background");
const footer_form_mcq = document.querySelector("#footer--form--mcq");
const footer_form_mcq_inputs = footer_form_mcq.querySelectorAll("input[name='user--receive-promotion']");

// Text to display after transiting into another page in main ritual
const dropDown_title = ["1. Groom Set Off", "2. Bride Prepares", "3. Thanksgiving", "4. Travel To Groom's House",
    "5. Arrived At Groom's House", "6. Enter The Room", "7. Thanksgiving"];
const dropDown_offset = 36; // Dropdown border + dropdown padding, to get the extra heihgt needed to display the full dropdown
const mSuperstition_form_result_animationDuration = 1000; // Animation duration in ms
var current_mContentId;
var current_mRitualButton = null;
var isMenuOn = false;

// Reviews for getting different score dfrom the form, index 0 being 0 score, index 5 being all correct
const mSuperstition_resltReviews = ["Are you even ready for your wedding?", "Maybe give yourself more time to think about it", "Probably discuss again?",
    "Not that bad, but can reconsider again!", "Not bad! Yall are ready for it", "Perfect time, what are you waiting for?"];
const mRitual_interaction_content_shownId = "m-ritual--interaction--content--show";

// Funcstion Call //

// Add in toggle funcstion for each layout--card to toggle their content and prevent the rest from scrolling
for (let i = 0; i < layout_card_a.length; i++) {
    layout_card_a[i].addEventListener("click", function () {
        toggleOverlayId_On(i);
    });
}

// For each layout card hover element, apply the width and height of their img to the hover element, 
// to allow them to follow the size of the img element
for (let i = 0; i < layout_card_img.length; i++) {

    // Add hover event to both img and circle text
    // As after resizing screen, the circle text might be smaller or covering over the img
    // SO add to both to ensure that at least one of them can be detected for hovering event
    layout_card_img[i].addEventListener("mouseover", function () {
        hover_layout_card_hover_circleText(i);
    });
    layout_card_hover_circleText[i].addEventListener("mouseover", function () {
        hover_layout_card_hover_circleText(i);
    });
}

// Add in event listener for button--cancel to close the current m-content and enable scrolling for the body content
for (let i = 0; i < button_cancels.length; i++) {
    button_cancels[i].addEventListener("click", toggleOverlayId_Off);
}

// Add in event listener to each form option description in main superstition, to rotate the expand sign and expand details after click
for (let i = 0; i < mSuperstiton_option_descriptions.length; i++) {

    mSuperstiton_option_descriptions[i].addEventListener("click", function () {
        mSuperstiton_options[i].classList.toggle("m-superstition--option--expand");

        // Toggle the drop down //
        let dropDown = mSuperstiton_options[i].querySelector(".m-superstition--option--detail");

        // If drop down is not expanded, expand it by setting the height to content height
        if (dropDown.offsetHeight == 0) {
            dropDown.style.height = dropDown.scrollHeight + dropDown_offset + "px";
        }
        // Else drop down is expanded, set the height back to 0
        else {
            dropDown.style.height = 0;
        }
    });
}

// Create button-circle based on the number of pages in Ritual then append them to parent
for (let i = 0; i < mRitual_interaction_content.length; i++) {

    let button = document.createElement("button");
    button.id = "m-ritual--interaction--button--circle" + i;
    button.className = "m-ritual--interaction--button--hollow";

    // Toggle on the first button by default
    if (i === 0) {
        current_mRitualButton = button;
        button.classList.toggle("m-ritual--interaction--button--hollow--clicked");
        mRitual_interaction_topDropDown_h2.innerHTML = dropDown_title[0];
    }
    // Append to parents
    mRitual_interaction_button_hollow_container.appendChild(button);
}

// Toggle the form result 
mSuperstition_form_submitButton.addEventListener("click", mSuperstition_toggleFormResult_On);
// Add in event delegation to the parent, to check for page navigators
mRitual_interaction_button_hollow_container.addEventListener("click", function (event) {

    // Check if the event target is buttons not the container to avoid register container as the button
    if (event.target != mRitual_interaction_button_hollow_container) {
        mRitual_togglePage(event.target);
    }

});
// Toggle the previou page and run loop bg aniamtion
mRitual_interaction_button_circles[0].addEventListener("click", function () {
    let button = mRitual_getNextButton(-1);
    mRitual_togglePage(button);
});
// Toggle the next page and run loop bg animation
mRitual_interaction_button_circles[1].addEventListener("click", function () {
    let button = mRitual_getNextButton(1);
    mRitual_togglePage(button);
});
// Toggle the main ritual content based on the current page
mRitual_interaction_contentButton.addEventListener("click", mRitual_toggleCurrentContent_On);
// Check if the given email is valid, if its valid then mark form as submitted , else show the warning
footer_form_button_submit.addEventListener("click", function () {
    if (footer_isEmailValid()) {
        footer_form_div.classList.add("footer--form--submitted");
        // Make the shape circle
        footer_form_div.style.width = footer_form_div.offsetHeight + "px";

        // Remove the warning blink effect if its presented
        if (footer_form_warning.classList.contains("footer--form--warning--blink")) {
            footer_form_warning.classList.remove("footer--form--warning--blink");
        }
    }
    // Prevent the animation from re-running
    else if (!footer_form_warning.classList.contains("footer--form--warning--blink")) {
        footer_form_warning.classList.add("footer--form--warning--blink");
    }
});

// Toggle between fullscreen and exit fullscreen based on the button id
topNav_right_toggleFullScreen.addEventListener("click", function () {

    // if the current button is for enter full screen, exter full screen
    if (topNav_right_toggleFullScreen.id == "full-screen") {
        topNav_enterFullscreen();
    }
    // else, exit full screen
    else {
        topNav_exitFullscreen();
    }

});

// Toggle the menu by hamburger icon
mobile_topNav_hamburger.addEventListener("click", topNav_toggleMenu);

// Close the menu after clicking anywhere
mobile_topNav_menu.addEventListener("click", topNav_toggleMenu);

// Function Declaration //

// Hover event for circle text
function hover_layout_card_hover_circleText(index) {
    let imgWidth = layout_card_img[index].offsetWidth;

    // Update the width amd height of circle text to cover the whole img
    layout_card_hover_circleText[index].style.width = imgWidth + "px";
    layout_card_hover_circleText[index].style.height = layout_card_img[index].offsetHeight + "px";

    // Update the font size of circle element to make it cover half of the img width
    layout_card_hover_circleText[index].style.fontSize = (imgWidth / 2) + "px";
}

// Toggle off the overlay by setting display to none and disable body scrolling
function toggleOverlayId_Off() {
    // Hide the overlay
    let overlay = document.querySelector("#" + current_mContentId);
    overlay.style.display = "none";

    // Check if the current object has a mRitual shown Id, if it does, clear the id before closing it
    if (overlay.id == mRitual_interaction_content_shownId) {
        overlay.id = "";
    }

    // Enable scrolling
    body.classList.toggle("no--scrolling");
}

// Toggle on the overlay by setting display to flex and enable body scrolling
function toggleOverlayId_On(index = -1, id = "") {
    // if index is given, save the layout card id in index
    if (index >= 0) {
        current_mContentId = layout_card_a[index].id + "--content";
    }
    // else, if specific id is given, save the given id
    else {
        current_mContentId = id;
    }

    // Toggle on the overlay based on the current id
    document.querySelector("#" + current_mContentId).style.display = "flex";
    body.classList.toggle("no--scrolling");
}

// Get the number of checked box from m-superstition form
function mSuperstition_getCheckedBoxCount() {
    let count = 0;

    for (let i = 0; i < mSuperstition_checkBox.length; i++) {
        let checkBox = mSuperstition_checkBox[i];
        // if the current checked box is checked, plus one to the count
        if (checkBox.checked) {
            count++;
        }
    }

    return count;
}

// Update the main superstition form results and toggle it on 
function mSuperstition_toggleFormResult_On() {

    // Toggle on the overlay
    toggleOverlayId_On(-1, mSuperstition_form_result.id);

    let score = mSuperstition_getCheckedBoxCount();
    let scoreTextBox = mSuperstition_form_result.querySelector("#m-superstition--form--result--score");
    let reviewTextBox = mSuperstition_form_result.querySelector("#m-superstition--form--result--review");
    scoreTextBox.innerHTML = 0; // Reset the score to 0
    reviewTextBox.innerHTML = mSuperstition_resltReviews[score];
    score *= 20; // Convert to percentage, total questions is 5, so score * 100 / 5 == score *=20

    // Return if the score is 0, as there is no need to run any animation
    if (score == 0) {
        return;
    }

    // Update the score by 1 for each interval, complete the whole increasement up to score in 2s
    let scoreIntervalId = setInterval(function () {
        let currentScore = parseInt(scoreTextBox.innerHTML);
        currentScore += 1;
        scoreTextBox.innerHTML = currentScore;

    }, mSuperstition_form_result_animationDuration / score);

    // Set interval out the score increasement after the animation duration
    setTimeout(function () {
        clearInterval(scoreIntervalId);
        scoreTextBox.innerHTML = score; // Make sure that the final score is correct when the animation is finished
    }, mSuperstition_form_result_animationDuration);
}

// Transform the current page to the given page based on the button
function mRitual_togglePage(button) {

    // Return if clicking on the same button
    if (button == current_mRitualButton) {
        return;
    }

    // Toggle off the previous button clicked state, and toggle on the current button clicked state
    if (current_mRitualButton != null) {
        current_mRitualButton.classList.toggle("m-ritual--interaction--button--hollow--clicked");
    }
    button.classList.toggle("m-ritual--interaction--button--hollow--clicked");


    // Run loop bg animation
    let isBgMovingToRight = false;

    // Loop through the buttons, if the target button is found before previous button, move bg from left to right
    // Else, move bg from right to left
    for (let i = 0; i < mRitual_interaction_button_hollow_container.childElementCount; i++) {

        let currentChild = mRitual_interaction_button_hollow_container.childNodes[i];

        // Next button is before the current button
        if (currentChild == button) {
            isBgMovingToRight = true;
            break;
        }
        // Next button is after the current button
        else if (currentChild == current_mRitualButton) {
            isBgMovingToRight = false;
            break;
        }
    }

    // Run the animation based on the direction
    if (isBgMovingToRight) {
        // Left to right
        mRitual_loopBackgroundOnce(5);
    }
    else {
        // Right to left
        mRitual_loopBackgroundOnce(-5);
    }


    // Update the current button
    current_mRitualButton = button;
    // Update the top drop down text after a delay to let the top drop down is fully hide fiirst
    setTimeout(function () {
        mRitual_interaction_topDropDown_h2.innerHTML = dropDown_title[mRitual_getCurrentButtonIndex()];
    }, 1000);
}

// Find the next button based on the given direction (either 1 or -1), wrap between 0 to maxCount
function mRitual_getNextButton(direction) {

    // Loop through the buttons and find the toggled one
    for (let i = 0; i < mRitual_interaction_button_hollow_container.childElementCount; i++) {

        // if current button is the toggled one, return the next button
        if (mRitual_interaction_button_hollow_container.childNodes[i] == current_mRitualButton) {

            let childCount = mRitual_interaction_button_hollow_container.childElementCount;
            // if finding the previous button (direction == -1) and the toggled button is the first button, return the last button
            if (direction < 0 && i == 0) {
                return mRitual_interaction_button_hollow_container.childNodes[childCount - 1];
            }
            // else if finding the next button (direction == 1) and the toggled button is the last button, return the first button
            else if (direction > 0 && i == childCount - 1) {
                return mRitual_interaction_button_hollow_container.childNodes[0];
            }
            // else, the next button is in range hence return the next button based on direction
            else {
                return mRitual_interaction_button_hollow_container.childNodes[i + direction];
            }
        }
    }

    // if no button is found, log the msg to console
    console.log("No button found");
}

// Assign the shownId to the target content, and call toggleOverlayId_On to toggle it on
function mRitual_toggleCurrentContent_On() {

    let index = mRitual_getCurrentButtonIndex();

    mRitual_interaction_content[index].id = mRitual_interaction_content_shownId;
    toggleOverlayId_On(-1, mRitual_interaction_content_shownId);
}

// Return the index of current page
function mRitual_getCurrentButtonIndex() {
    for (let i = 0; i < mRitual_interaction_button_hollow_container.childElementCount; i++) {

        if (mRitual_interaction_button_hollow_container.childNodes[i] == current_mRitualButton) {
            return i;
        }
    }
}

// Check if the given email in footer form is valid (e.g. included @). 
// Return true if @ is included, otherwise return false
function footer_isEmailValid() {
    let email = footer_form_input_email.value;
    for (const char of email) {
        if (char == '@') {
            return true;
        }
    }

    return false;
}

// Enter full screen and update the button sprite to exit full screen
function topNav_enterFullscreen() {

    // return if current is already full screen (curret button icon is "exit full screen")
    if (topNav_right_toggleFullScreen.id == "exit-full-screen") {
        return;
    }

    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    }
    else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    }
    else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
    else {
        alert("Cant Enter Full Screen");
    }

    // Update button sprite to exit full screen icon
    topNav_right_toggleFullScreen.id = "exit-full-screen";
}

// Exit full screen and update the button sprite to enter full screen
function topNav_exitFullscreen() {

    // return if current is not full screen (button icon is "enter full screen")
    if (topNav_right_toggleFullScreen.id == "full-screen") {
        return;
    }

    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    }
    else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
    else {
        alert("Cant Exit Full Screen");
    }

    // Update button sprite to full screen icon
    topNav_right_toggleFullScreen.id = "full-screen";
}

// Show the menu with animations 
function topNav_toggleMenu() {

    // Flip Menu variable to mark down the current state
    isMenuOn = !isMenuOn;

    // Hamburger Icon //
    // Calculate the max index to swap, to avoid swapping the swapped item
    let maxIndex = parseInt(hamburger_lines.length / 2);

    // Swap the length of the ffist line with the last, and so on
    for (let i = 0; i < maxIndex; i++) {
        // Calculate the index of the item to swap with
        let targetIndex = hamburger_lines.length - (i + 1);

        // Calculate the width in percentage as the width of the lines are following the size of the icon
        let currentLine_lengthPercentage = (parseFloat(hamburger_lines[i].offsetWidth) / mobile_topNav_hamburger.offsetWidth) * 100;
        let targetLine_lengthPercentage = hamburger_lines[targetIndex].offsetWidth / mobile_topNav_hamburger.offsetWidth * 100;

        // Swap the width of the two item
        hamburger_lines[i].style.width = targetLine_lengthPercentage + "%";
        hamburger_lines[targetIndex].style.width = currentLine_lengthPercentage + "%";
    }

    // Show the menu
    if (isMenuOn) {
        // Menu //
        // Scale up the overlay //
        mobile_topNav_menu.style.transform = "scale(1)";

        // Bring in the Menu //
        // Move the mene fully into the screen
        topNav_menu_background.style.left = 0;

        // Fade in Page Nav one by one //
        // Recursive to fade in Page nav from index 0
        topNav_fadeInPageNav(0);
    }
    // Hide the menu
    else {
        // Menu //
        // Scale up the overlay //
        mobile_topNav_menu.style.transform = "scale(0)";

        // Bring in the Menu //
        // Move the mene fully into the screen
        topNav_menu_background.style.left = -42 + "vw";

        // Iniatialze the page nav, ensure that they are hidden before the transition
        for (let i = 0; i < mobile_topNav_menu_list_li.length; i++) {
            mobile_topNav_menu_list_li[i].style.opacity = 0;
        }
    }
}

// Fade in the page nav at the given index
function topNav_fadeInPageNav(index) {
    setTimeout(function () {
        mobile_topNav_menu_list_li[index].style.opacity = 100;
        index++;

        // Recursive until every page nav have been called
        if (index < mobile_topNav_menu_list_li.length) {
            topNav_fadeInPageNav(index);
        }
    }, 100);
}
///////////////////////////
// Overlay //

// Properties //
const overlays = document.querySelectorAll(".overlay");

// Funcstion Call //

// Hide each overlays at the start
for (let i = 0; i < overlays.length; i++) {
    overlays[i].style.display = "none";
}

// Funcstion Declaration //



///////////////////////////
// Main Ritual Interaction //

// Properties //
const mRitual_interaction_loopingBackgrounds = document.querySelectorAll(".loop-background");
const mRitual_interaction_character_heads = document.querySelectorAll(".m-ritual--interaction--character--head");
const mRitual_interaction_topDropDown = document.querySelector("#m-ritual--interaction--top-drop-down");

const characterHead_maxRotation = 5;
const topDropDown_maxYValue = "7em";
const characterHead_animationDuration = 1.0;

var loopingBg_posX = 0;
var loopingBg_intervalId = null;
var characterHeadRotation = 0;
var characterHead_rotateIncreasement = characterHead_maxRotation / animationFrameRate / characterHead_animationDuration * 2; // Calculated so that to complete a full cycle in the given duration

// Funcstion Call //


// Funcstion Declaration //

// Move the looping background along x-axis based on the increasement, ends when the first looping background is fully hidden and second looping background is fully shown
// Head rotation is updated and top drop down is hided
function mRitual_loopBackgroundOnce(increasement) {

    // If there's already an interval running, reset the current animation and run the new one
    if (loopingBg_intervalId != null) {
        mRitual_resetLoopBackgroundProperty();
    }

    let isLeftToRight = increasement > 0;

    // If moving from left to right, start from second loop bg
    if (isLeftToRight) {
        loopingBg_posX = -mRitual_interaction_loopingBackgrounds[0].offsetWidth;
    }
    // else, if moving from right to left, start from first loop bg
    else {
        loopingBg_posX = 0;
    }

    loopingBg_intervalId = setInterval(function () {
        loopingBg_posX += increasement; // Update the pos 
        // update the css position value for each of the loop bg
        for (let i = 0; i < mRitual_interaction_loopingBackgrounds.length; i++) {
            mRitual_interaction_loopingBackgrounds[i].style.transform = `translate(${loopingBg_posX}px)`;
        }

        // Update character head rotation
        mRitual_updateHeadRotation();

        // Call the reset function if the loop background reached the max / min position
        if ((isLeftToRight && loopingBg_posX >= 0) || (!isLeftToRight && loopingBg_posX <= -mRitual_interaction_loopingBackgrounds[0].offsetWidth)) {
            mRitual_resetLoopBackgroundProperty();
        }

    }, 1000 / animationFrameRate);

    // Hide the top drop down
    mRitual_interaction_topDropDown.style.top = 0;
}

// Reset the properties used in mRitual_loopBackgroundOnce and reset head rotation and show the top drop down
function mRitual_resetLoopBackgroundProperty() {

    clearInterval(loopingBg_intervalId); // Clear the interval
    loopingBg_intervalId = null; // Reset the interval id back to null

    // Reset the background position back to 0
    loopingBg_posX = 0;
    for (let i = 0; i < mRitual_interaction_loopingBackgrounds.length; i++) {
        mRitual_interaction_loopingBackgrounds[i].style.transform = `translate(${loopingBg_posX}px)`;
    }

    // Reset head rotation
    mRitual_resetHeadRotation();

    // Show the top drop down
    mRitual_interaction_topDropDown.style.top = topDropDown_maxYValue;
}

// Update the head rotation 
function mRitual_updateHeadRotation() {
    // Update the character head rotation
    characterHeadRotation += characterHead_rotateIncreasement;

    // Transform the head
    for (let i = 0; i < mRitual_interaction_character_heads.length; i++) {
        mRitual_interaction_character_heads[i].style.transform = `rotate(${characterHeadRotation}deg)`;
    }

    // If the rotation reached the max, flip the direction
    if (Math.abs(characterHeadRotation) >= characterHead_maxRotation) {
        characterHead_rotateIncreasement *= -1;
    }
}

// Smooth the head rotation back to 0 from the current rotation
function mRitual_resetHeadRotation() {
    let headRotationIntervalId = setInterval(function () {

        // If the rotation is decresing and reached below 0 
        // OR the rotation is increasing and reached above 0
        // Reset the rotation to 0 and clear the interval
        if (characterHead_rotateIncreasement < 0 && characterHeadRotation < 0 ||
            characterHead_rotateIncreasement > 0 && characterHeadRotation > 0
        ) {
            // Reset the rotation back to 0
            characterHeadRotation = 0;

            // Transform the head
            for (let i = 0; i < mRitual_interaction_character_heads.length; i++) {
                mRitual_interaction_character_heads[i].style.transform = `rotate(${characterHeadRotation}deg)`;
            }

            // Clear interval
            clearInterval(headRotationIntervalId);
        }
        // Else continue to update the rotation until it reached back to ~0
        else {
            mRitual_updateHeadRotation();
        }
    }, 1000 / animationFrameRate);
}


///////////////////////////////
// Game //

// Properties //
const game_ingredient = document.querySelector("#game--ingredient");
const game_ingredient_gridContainer = game_ingredient.querySelector("#game--ingredient--grid-container");
const game_ingredient_sprites = game_ingredient.querySelectorAll(".game--ingredient--sprite");
const game_product_sprite = game_ingredient.querySelector(".game--product--sprite");

const game_customer = document.querySelector("#game--customer");
const game_customer_front = game_customer.querySelector("#game--customer--front");
const game_customer_back = game_customer.querySelector("#game--customer--back");
const game_menu = document.querySelector("#game--menu");
const game_menu_h2 = game_menu.querySelector("h2");
const game_button_start = document.querySelector("#game--button--start");
const game_timer = document.querySelector("#game--timer");
const game_score_h3 = document.querySelector("#game--score h3");
const game_warningMessage_container = document.querySelector("#game--warning-message--container");


const gameBoundary_x = game_ingredient.offsetWidth / 2;
const gameBoundary_y = game_ingredient.offsetHeight;
const customer_animationDuration = 0.8;
const message_wrongProduct = "Wrong Item Served";
const message_invalidIngredient = "I need the correct container";
const mobile_maxWidth = 800;

const l_sound_backgroundMusic = new Audio("audio/bgmloop.mp3");
const sound_clickIngredient = new Audio("audio/objecthit.MP3");
const sound_productPacked_angbao = new Audio("audio/paper.mp3");
const sound_productPacked_tea = new Audio("audio/waterpouring.mp3");
const sound_serve_wrong = new Audio("audio/wrong.mp3");
const sound_serve_correct = new Audio("audio/score.mp3");

var currentProductId = -1; // -1 == empty, 0 == angbao open, 1 == cup empty, 2 == cup filled, 3 == angbao close
var isProductOnDrag = false;
var isProductUpdatingPosition = false;
var cursor_initialX = 0;
var cursor_initialY = 0;
var customerProductId = 3; // Indicate the customer wanted product, wrapped between 2 and 3 (cup filled and angbao close)
var customerFront_right = 0;
var customerBack_right = 0;
var currentScore = 0;
var mobile_ratio = 1; // Scaling value based on mobile_maxWidth

// Funcstion Call //

// Check for click event for child
game_ingredient.addEventListener("click", function (evt) {
    // If clicking on child, call funcstion to perform action
    if (evt.target != game_ingredient) {
        let childIndex = game_getButtonIndex(evt.target);

        // if child is found, proceed to function calling
        if (childIndex >= 0) {
            game_updateProduct(childIndex);
        }
    }
});

// When user pressed on the product, save the initial cursor position
game_product_sprite.addEventListener("mousedown", function (evt) {

    // Save the inittial mouse position
    cursor_initialX = evt.clientX;
    cursor_initialY = evt.clientY;

    // if the current product is dragable (completed), then enable dragging on product
    if (currentProductId == 2 || currentProductId == 3) {
        // Default event handller is cancelled for product object
        // To avoid the default dragging event from breaking the drag and drop logic here
        evt.preventDefault();

        isProductOnDrag = true;
    }
});
game_product_sprite.addEventListener("touchstart", function (evt) {

    // Save first the inittial touch position
    cursor_initialX = evt.changedTouches[0].clientX;
    cursor_initialY = evt.changedTouches[0].clientY;

    // if the current product is dragable (completed), then enable dragging on product
    if (currentProductId == 2 || currentProductId == 3) {
        // Default event handller is cancelled for product object
        // To avoid the default dragging event from breaking the drag and drop logic here
        evt.preventDefault();

        isProductOnDrag = true;
    }
});

// While the mouse is dragging the product, update its position
document.addEventListener("mousemove", function (evt) {

    // If no update function calling is running, start a new function call to update the product position
    if (isProductOnDrag && !isProductUpdatingPosition) {
        isProductUpdatingPosition = true;
        setTimeout(function () {
            game_updateProductPosition(evt.clientX, evt.clientY);
        }, 1000 / animationFrameRate);
    }
});
document.addEventListener("touchmove", function (evt) {

    // If no update function calling is running, start a new function call to update the product position
    if (isProductOnDrag && !isProductUpdatingPosition) {
        isProductUpdatingPosition = true;
        setTimeout(function () {

            // As touch move required changing of touch position, so use changedTouches
            // Use only the first changed touches
            game_updateProductPosition(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY);
        }, 1000 / animationFrameRate);
    }
});

// When user released cursor, if released on customer interaction area, proceed to check the product, otherwise reset the product only
document.addEventListener("mouseup", function () {

    if (isProductOnDrag) {

        // Check if the product is over the customer interaction area before initialize the position value
        // If it is, check for the current product
        if (game_isCursorOverCustomerInteractionArea()) {
            game_checkCurrentProduct();
        }

        // Allow the update funcstion to set the product back to 0 0 position
        game_resetProductPosition();

        isProductOnDrag = false;
        isProductUpdatingPosition = false;
    }
});
document.addEventListener("touchend", function () {

    if (isProductOnDrag) {

        // Check if the product is over the customer interaction area before initialize the position value
        // If it is, check for the current product
        if (game_isCursorOverCustomerInteractionArea()) {
            game_checkCurrentProduct();
        }

        // Allow the update funcstion to set the product back to 0 0 position
        game_resetProductPosition();

        isProductOnDrag = false;
        isProductUpdatingPosition = false;
    }
});

// Resize the game ingredients every time the windo is resized, \
// to ensure that all 4 types of ingredients and product are showing fully in any smaller screen width
window.addEventListener("resize", game_updateIngredientsSize);

// Start the game after clicking on the start button
game_button_start.addEventListener("click", game_startGame);

// Funcstion Declaration //

// Return the index of the given button in its parent hierachy, return -1 if not found
function game_getButtonIndex(button) {
    // Loop through each of the child to find the button
    for (let i = 0; i < game_ingredient_sprites.length; i++) {

        // if button mathced, return the index
        if (game_ingredient_sprites[i] == button) {
            return i;
        }
    }

    // button not found, return -1
    return -1;
}

// Show the based product if current product is empty, else update the product if clicked on product ingredient
// And initialize it to be at the center
function game_updateProduct(buttonIndex) {

    // return if clicking on the same item
    if (currentProductId === buttonIndex) {
        sound_clickIngredient.play();
        return;
    }

    // Return if product ingredient is clicked without a based product, mark it as invalid interaction
    if ((buttonIndex === 2 && currentProductId != 1) || (buttonIndex === 3 && currentProductId != 0)) {
        sound_clickIngredient.play();
        game_promptMessage(message_invalidIngredient);
        return;
    }

    // Update the current product stage
    currentProductId = buttonIndex;
    game_updateProductId();
    // Update the position of product to 0 0 position
    game_resetProductPosition();
}

// Update the current product showing on screen
function game_updateProductId() {
    switch (currentProductId) {
        // Angbao Open
        case (0):
            game_product_sprite.id = "game--product--angbao--open";
            sound_clickIngredient.play();
            break;

        // Cup Empty
        case (1):
            game_product_sprite.id = "game--product--tea--empty";
            sound_clickIngredient.play();
            break;

        // Cup Fill
        case (2):
            game_product_sprite.id = "game--product--tea--fill";
            sound_productPacked_tea.play();
            break;

        // Angbao Close
        case (3):
            game_product_sprite.id = "game--product--angbao--close";
            sound_productPacked_angbao.play();
            break;

        // Empty
        default:
            game_product_sprite.id = "game--product--none";
    }
}

// Update the product position following the cursor
function game_updateProductPosition(cursorX, cursorY) {

    // Return if product update is cancel
    if (!isProductUpdatingPosition) {
        return;
    }

    // Calculate the direction from product to cursor
    let directionX = (parseInt(cursorX) - cursor_initialX) / mobile_ratio;
    let directionY = (parseInt(cursorY) - cursor_initialY) / mobile_ratio;

    // Gap between the bottom edge of the boundary and product, and gap between boundary origin and product top edge
    let gameBoundary_offSet_y = (game_ingredient.offsetHeight - game_product_sprite.offsetHeight) / 2;

    // Avoid the product from going out of parent area, so capped the value between parents sizes
    directionX = Math.max(-gameBoundary_x, directionX); // Check for left side
    directionX = Math.min(gameBoundary_x, directionX);  // Check for right side
    directionY = Math.min(gameBoundary_offSet_y, directionY); // Check for bottom edge
    // Check for top edge by adding top half of the boundary + offset between y origin and product, offset of the sprite is added to allow the blank space of the sprite to go out of boundary
    directionY = Math.max(-(gameBoundary_y + gameBoundary_offSet_y + game_product_sprite.offsetHeight / 2), directionY);

    // Update the product absolute position while keeping its center alignment
    game_product_sprite.style.left = directionX + game_product_sprite.offsetWidth / 2 + "px";
    game_product_sprite.style.top = directionY + "px";

    // Mark update as done
    isProductUpdatingPosition = false;
}

// Reset the product position back to the center 
function game_resetProductPosition() {

    // Update the product absolute position while keeping its center alignment
    game_product_sprite.style.left = game_product_sprite.offsetWidth / 2 + "px";
    game_product_sprite.style.top = 0 + "px";
}

// Function to serve the product to customer, incharge of checking wther the product is correct and update custome rif correct, otherwise promt message
function game_checkCurrentProduct() {

    // If current product is correct, update the customer
    if (currentProductId == customerProductId) {
        game_updateCustomer();
        game_updateScore();

        sound_serve_correct.play();
    }
    // Else, prompt message
    else {
        game_promptMessage(message_wrongProduct);

        sound_serve_wrong.play();
    }

    // Clear the current product
    currentProductId = -1;
    game_updateProductId();
}

// Update the customer css and html, and var customerProductId
function game_updateCustomer() {

    // update the front customer sprite to the previous customer
    game_updateCustomerSprite(game_customer_front, customerProductId == 3);


    // Sewt customer product id as either 2 or 3
    // 2 for ld, 3 for young customer
    customerProductId = Math.round(Math.random() + 2);

    // update the back customer sprite to the updated customer
    game_updateCustomerSprite(game_customer_back, customerProductId == 3);


    // Both costumer (front and back) needs to move half of the parents width, so this will store the exact distance to move
    const distanceToMove = (game_customer.offsetWidth + game_customer_front.offsetWidth) / 2;

    // Initialize the position
    customerFront_right = (game_customer.offsetWidth - game_customer_front.offsetWidth) / 2;
    customerBack_right = -game_customer_back.offsetWidth;
    game_updateCustomerPosition(distanceToMove, customerFront_right, customerBack_right); // init back to default position

    // Call for set interval to update the position of each customer
    let customer_animationIntervalId = setInterval(function () {
        game_updateCustomerPosition(distanceToMove, customerFront_right, customerBack_right);
    }, 1000 / animationFrameRate);

    // Stop the animation after a set duration
    setTimeout(function () {
        clearInterval(customer_animationIntervalId);
    }, customer_animationDuration * 1000);
}

// Update the costumer sprite position, need to call every animation frame to animate to the given position in the duration set
function game_updateCustomerPosition(distance) {
    // Get the position value to increase
    let increasement = distance / customer_animationDuration / animationFrameRate;

    // Update the customer position
    customerFront_right += increasement;
    customerBack_right += increasement;

    // Apply the increasement for this frame
    game_customer_front.style.right = customerFront_right + "px";
    game_customer_back.style.right = customerBack_right + "px";
}

// Update the sprite of the given customer to either old or young 
function game_updateCustomerSprite(customer, isToYoung) {

    // Clear the young customer sprite if changing to old
    if (!isToYoung && customer.classList.contains("game--customer--young")) {
        customer.classList.remove("game--customer--young");
    }
    // Clear the old customer sprite if changing to young
    else if (isToYoung && customer.classList.contains("game--customer--old")) {
        customer.classList.remove("game--customer--old");
    }

    // Check if the customer containes the needed sprite, if missing then add it in
    if (isToYoung && !customer.classList.contains("game--customer--young")) {
        customer.classList.add("game--customer--young");
    }
    // Check if the customer containes the needed sprite, if missing then add it in
    else if (!isToYoung && !customer.classList.contains("game--customer--old")) {
        customer.classList.add("game--customer--old");
    }
}

// Check if the cursor is over the customer interaction area, return true if it is, otherwise false
function game_isCursorOverCustomerInteractionArea() {
    // Since customer interaction area took the entire space that's above the product area
    // So by checking if the product is above the proeduct area will give the result

    let productPosition_y = parseInt(game_product_sprite.style.top);
    // Gap between the bottom edge of the boundary and product, and gap between boundary origin and product top edge
    let gameBoundary_offSet_y = (game_ingredient.offsetHeight - game_product_sprite.offsetHeight) / 2;
    return Math.abs(productPosition_y) > (game_product_sprite.offsetHeight + gameBoundary_offSet_y);
}

//Change the opacity of game menu to 0 when user click on the start button, to allow the game to start
// - Start timer
// - Allow for interaction with game by hiding the overlay after 0.5s delay
function game_startGame() {

    // Hide the overlay menu
    game_menu.style.opacity = 0;
    setTimeout(function () {
        game_menu.style.display = "none";
    }, 500);

    // Start the timer
    game_timer.classList.add("start");

    // Initialize the score to 0
    currentScore = 0;
    game_updateScore(0); // Update the inner html of score without increasing the value

    // Update the customer product id to give it an initial value
    game_updateCustomer();

    // Play the bgm
    game_toggleBgm(true);

    // End the game after 60 secs
    setTimeout(function () {
        game_endGame();
    }, 60000);
}

// End the current game, the score will replace the game title
function game_endGame() {

    // Show the overlay menu
    game_menu.style.display = "flex";
    game_menu.style.opacity = 100;

    // Initialize the timer
    game_timer.classList.remove("start");

    // Replace the game title to the score
    game_menu_h2.innerHTML = "You got: " + currentScore;

    // Reset the current product
    currentProductId = -1;
    game_updateProductId();

    // Stop and reset the bgm
    game_toggleBgm(false);
}

// Update the score variable and update the score inner html in the format of '00'
// bY DEFAULT, INCREASEMENT IS 1, can set it as 0 to avoid increasement to the score
function game_updateScore(increasement = 1) {
    currentScore += increasement;

    // if score is single degits, add a '0' infront to display in the format of '00'
    if (currentScore < 10) {
        game_score_h3.innerHTML = `0${currentScore}`;
    }
    // else, score is at least double degits so dont need to convert the format 
    else {
        game_score_h3.innerHTML = currentScore;
    }
}

// Prompt the message to the game interaction area, mesage content is defined by the given parameter: message
function game_promptMessage(message) {
    // Create the message
    let warningMessage = document.createElement("span"); // Create tag
    warningMessage.innerHTML = message; // Add in the message

    // Add to the parent to transit based on the parent
    warningMessage.classList.add("game--warning-message");

    // Add message to parent
    game_warningMessage_container.appendChild(warningMessage);

    // Apply the value to allow transition to start
    warningMessage.style.bottom = (game_warningMessage_container.offsetHeight - warningMessage.offsetHeight) + "px"; // Move message to the top edge
    warningMessage.style.opacity = 0; // Fade out the message

    // Delete the message after the transition duration (1.0s)
    setTimeout(function () {
        game_warningMessage_container.removeChild(warningMessage);
    }, 1000);
}

// Toggle the loop bgm
function game_toggleBgm(isPlaying) {
    l_sound_backgroundMusic.loop = true;

    // if playing sound, play the loop bgm
    if (isPlaying) {
        l_sound_backgroundMusic.play();
    }
    // else, reset the bgm and pause the it
    else {
        l_sound_backgroundMusic.currentTime = 0;
        l_sound_backgroundMusic.pause();
    }
}

// Resize the game ingredients to match with the screen size, as it uses sprite, so use transform:scale() for resizing 
// Size will only be running when in mobile view (width < 800)
function game_updateIngredientsSize() {
    // if currently is not mobile view, return to prevent unexpected resizing
    if (window.innerWidth > mobile_maxWidth) {
        return;
    }

    // Calculate how much it scaled down based on the maximum mobile view
    mobile_ratio = window.innerWidth / 800;

    // Apply the new scaling to ingredients
    game_ingredient_gridContainer.style.transform = `scale(${mobile_ratio})`;
}

////////////////////////////
// Mobile Only //

// Variable Declaration //
const hover_subTopicDescriptions = document.querySelectorAll(".hover--sub-topic-description");

// Funcstion Call //

// Toggle class "click" for the hoverables
for (let i = 0; i < hover_subTopicDescriptions.length; i++) {
    hover_subTopicDescriptions[i].addEventListener("click", function () {
        hover_subTopicDescriptions[i].classList.toggle("click");
    });
}

// Funcstion Declaration //


//////////////////////////////
// Reset Function //

// Reset the changes made and reset the page back to its initial state
// Have to put at the end to nsure that it is able to access to every varibales
function resetAllUI() {
    ///////////////////////////////
    // Reset page sections
    disableAllMains(); // hides all .m

    // Hide overlays
    for (let i = 0; i < overlays.length; i++) {
        overlays[i].style.display = "none";
    }

    // Remove no-scroll class
    document.body.classList.remove("no--scrolling");

    // Exit fullscreen
    topNav_exitFullscreen();

    // Reset superstition form result
    for (let i = 0; i < mSuperstition_checkBox.length; i++) {
        // Uncheck the checkbox
        mSuperstition_checkBox[i].checked = false;
    }

    // Reset ritual interaction back to page 1
    mRitual_togglePage(mRitual_interaction_button_hollow_container.childNodes[0]);

    // Reset hover elements
    for (let i = 0; i < hover_subTopicDescriptions.length; i++) {
        if (hover_subTopicDescriptions[i].classList.contains("click")) {
            hover_subTopicDescriptions[i].classList.remove("click");
        }
    }

    // Keep the Superstiion Description
    for (let i = 0; i < mSuperstiton_option_descriptions.length; i++) {

        // Keep the drop down if its expanded
        if (mSuperstiton_options[i].classList.contains("m-superstition--option--expand")) {
            mSuperstiton_options[i].classList.remove("m-superstition--option--expand");
            let dropDown = mSuperstiton_options[i].querySelector(".m-superstition--option--detail");
            dropDown.style.height = 0;
        }
    }

    /////////////////////////////
    // Reset footer form

    // Clear the submitted icon
    if (footer_form_div.classList.contains("footer--form--submitted")) {
        footer_form_div.classList.remove("footer--form--submitted");
    }
    // Remove the warning blink effect if its presented
    if (footer_form_warning.classList.contains("footer--form--warning--blink")) {
        footer_form_warning.classList.remove("footer--form--warning--blink");
    }

    // Clear the form text field
    footer_form_input_email.value = "";

    // Reset the radio buttons, first button is checked and second is unchecked
    if (!footer_form_mcq_inputs[0].checked) {
        footer_form_mcq_inputs[0].checked = true;
        footer_form_mcq_inputs[1].checked = false;
    }

    /////////////////////////////
    // Game //

    // Reset game
    game_endGame();
    currentScore = 0;
    game_score_h3.innerHTML = "00";
    game_timer.classList.remove("start");

    // Reset product
    currentProductId = -1;
    game_updateProductId();
    game_resetProductPosition();

    // Reset customer
    game_customer_front.classList.remove("game--customer--young", "game--customer--old");
    game_customer_back.classList.remove("game--customer--young", "game--customer--old");
    game_customer_front.style.right = "";
    game_customer_back.style.right = "";

    // Reset game menu
    game_menu.style.display = "flex";
    game_menu.style.opacity = 1;
    game_menu_h2.innerHTML = "Thanksgiving Section";
}
// Reset the pgae once after loading
resetAllUI();