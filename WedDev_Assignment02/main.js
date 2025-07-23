console.log("JS loaded");
const animationFrameRate = 45;

////////////////////////////////////
// Page Toggle //

// Properties //
const mains = document.querySelectorAll(".m");
const costume_costume = document.querySelector("#costume--costume");
const costume_ritual = document.querySelector("#costume--ritual");
const symbolism_symbolism = document.querySelector("#symbolism--symbolism");
const symbolism_superstition = document.querySelector("#symbolism--superstition");

// Function Call //
disableAllMains(); // Hide every main content page

// Click to toggle event //
// Toggle Costume page
costume_costume.addEventListener("click", function(){
    showMain("costume");
})
costume_ritual.addEventListener("click", function(){
    showMain("ritual");
})
symbolism_symbolism.addEventListener("click", function(){
    showMain("symbolism");
})
symbolism_superstition.addEventListener("click", function(){
    showMain("superstition");
})


// Function Declaration //

// Hide every main content page
function disableAllMains(){

    for (const m of mains) {
        m.style.display = "none";
    }
}

// Show the specific page with the name <param> m_name </param>
function showMain(m_name){

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

const mSuperstition_form_submitButton = document.querySelector("#m-superstition--form--submit-button");
const mSuperstition_form_result = document.querySelector("#m-superstition--form--result");
const mRitual_interaction_button_hollow_container = document.querySelector("#m-ritual--interaction--button--hollow--container");
const mRitual_interaction_contentButton = document.querySelector("#m-ritual--interaction--content-button");
const mRitual_interaction_topDropDown_h2 = document.querySelector("#m-ritual--interaction--top-drop-down h2");

// Text to display after transiting into another page in main ritual
const dropDown_title = ["1. Groom Set Off", "2. Bride Prepares", "3. Thanksgiving", "4. Travel To Groom's House", 
                        "5. Arrived At Groom's House", "6. Enter The Room", "7. Thanksgiving"]; 
const dropDown_offset = 36; // Dropdown border + dropdown padding, to get the extra heihgt needed to display the full dropdown
const mSuperstition_form_result_animationDuration = 1000; // Animation duration in ms
var current_mContentId;
var current_mRitualButton = null;

// Reviews for getting different score dfrom the form, index 0 being 0 score, index 5 being all correct
const mSuperstition_resltReviews = ["Are you even ready for your wedding?", "Maybe give yourself more time to think about it", "Probably discuss again?",
                                    "Not that bad, but can reconsider again!", "Not bad! Yall are ready for it", "Perfect time, what are you waiting for?"];
const mRitual_interaction_content_shownId = "m-ritual--interaction--content--show";

// Funcstion Call //

// Add in toggle funcstion for each layout--card to toggle their content and prevent the rest from scrolling
for(let i = 0; i < layout_card_a.length; i++){
    layout_card_a[i].addEventListener("click", function(){
        toggleOverlayId_On(i);
    })
}

// For each layout card hover element, apply the width and height of their img to the hover element, 
// to allow them to follow the size of the img element
for(let i = 0; i < layout_card_img.length; i++){

    // Add hover event to both img and circle text
    // As after resizing screen, the circle text might be smaller or covering over the img
    // SO add to both to ensure that at least one of them can be detected for hovering event
    layout_card_img[i].addEventListener("mouseover", function(){
        hover_layout_card_hover_circleText(i);
    });
    layout_card_hover_circleText[i].addEventListener("mouseover", function(){
        hover_layout_card_hover_circleText(i);
    });
}

// Add in event listener for button--cancel to close the current m-content and enable scrolling for the body content
for(let i = 0; i < button_cancels.length; i++){
    button_cancels[i].addEventListener("click", toggleOverlayId_Off);
}

// Add in event listener to each form option description in main superstition, to rotate the expand sign and expand details after click
for(let i = 0; i < mSuperstiton_option_descriptions.length; i++){

    mSuperstiton_option_descriptions[i].addEventListener("click", function(){
        mSuperstiton_options[i].classList.toggle("m-superstition--option--expand");

        // Toggle the drop down //
        let dropDown = mSuperstiton_options[i].querySelector(".m-superstition--option--detail");

        // If drop down is not expanded, expand it by setting the height to content height
        if(dropDown.offsetHeight == 0){
            dropDown.style.height = dropDown.scrollHeight + dropDown_offset + "px";
        }
        // Else drop down is expanded, set the height back to 0
        else{
            dropDown.style.height = 0;
        }
    })
}

// Create button-circle based on the number of pages in Ritual then append them to parent
for(let i = 0; i < mRitual_interaction_content.length; i++){

    let button = document.createElement("button");
    button.id = "m-ritual--interaction--button--circle" + i;
    button.className = "m-ritual--interaction--button--hollow";

    // Toggle on the first button by default
    if(i === 0){
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
mRitual_interaction_button_hollow_container.addEventListener("click", function(event){

    // Check if the event target is buttons not the container to avoid register container as the button
    if(event.target != mRitual_interaction_button_hollow_container){
        mRitual_togglePage(event.target);
    }
    
});
// Toggle the previou page and run loop bg aniamtion
mRitual_interaction_button_circles[0].addEventListener("click", function(){
    let button = mRitual_getNextButton(-1);
    mRitual_togglePage(button);
})
// Toggle the next page and run loop bg animation
mRitual_interaction_button_circles[1].addEventListener("click", function(){
    let button = mRitual_getNextButton(1);
    mRitual_togglePage(button);
})
// Toggle the main ritual content based on the current page
mRitual_interaction_contentButton.addEventListener("click", mRitual_toggleCurrentContent_On);

// Function Declaration //

// Hover event for circle text
function hover_layout_card_hover_circleText(index){
    let imgWidth = layout_card_img[index].offsetWidth;

    // Update the width amd height of circle text to cover the whole img
    layout_card_hover_circleText[index].style.width = imgWidth + "px";
    layout_card_hover_circleText[index].style.height = layout_card_img[index].offsetHeight + "px";

    // Update the font size of circle element to make it cover half of the img width
    layout_card_hover_circleText[index].style.fontSize = (imgWidth / 2) + "px";
}

// Toggle off the overlay by setting display to none and disable body scrolling
function toggleOverlayId_Off(){
    // Hide the overlay
    let overlay = document.querySelector("#" + current_mContentId);
    overlay.style.display = "none";

    // Check if the current object has a mRitual shown Id, if it does, clear the id before closing it
    if(overlay.id == mRitual_interaction_content_shownId){
        overlay.id = "";
    }

    // Enable scrolling
    body.classList.toggle("no--scrolling");
}

// Toggle on the overlay by setting display to flex and enable body scrolling
function toggleOverlayId_On(index = -1, id = ""){
    // if index is given, save the layout card id in index
    if(index >= 0){
        current_mContentId = layout_card_a[index].id + "--content";
    }
    // else, if specific id is given, save the given id
    else{
        current_mContentId = id;
    }

    // Toggle on the overlay based on the current id
    document.querySelector("#" + current_mContentId).style.display = "flex";
    body.classList.toggle("no--scrolling");
}

// Get the number of checked box from m-superstition form
function mSuperstition_getCheckedBoxCount(){
    let count = 0;

    for(let i = 0; i < mSuperstition_checkBox.length; i++){
        let checkBox = mSuperstition_checkBox[i];
        // if the current checked box is checked, plus one to the count
        if(checkBox.checked){
            count++;
        }
    }

    return count;
}

// Update the main superstition form results and toggle it on 
function mSuperstition_toggleFormResult_On(){

    // Toggle on the overlay
    toggleOverlayId_On(-1, mSuperstition_form_result.id);

    let score = mSuperstition_getCheckedBoxCount();
    let scoreTextBox = mSuperstition_form_result.querySelector("#m-superstition--form--result--score");
    let reviewTextBox = mSuperstition_form_result.querySelector("#m-superstition--form--result--review");
    scoreTextBox.innerHTML = 0; // Reset the score to 0
    reviewTextBox.innerHTML = mSuperstition_resltReviews[score];
    score *= 20; // Convert to percentage, total questions is 5, so score * 100 / 5 == score *=20

    // Return if the score is 0, as there is no need to run any animation
    if(score == 0){
        return;
    }

    // Update the score by 1 for each interval, complete the whole increasement up to score in 2s
    let scoreIntervalId = setInterval(function(){
        let currentScore = parseInt(scoreTextBox.innerHTML);
        currentScore += 1;
        scoreTextBox.innerHTML = currentScore;

    }, mSuperstition_form_result_animationDuration / score);

    // Set interval out the score increasement after the animation duration
    setTimeout(function(){
        clearInterval(scoreIntervalId);
        scoreTextBox.innerHTML = score; // Make sure that the final score is correct when the animation is finished
    }, mSuperstition_form_result_animationDuration);
}

// Transform the current page to the given page based on the button
function mRitual_togglePage(button){

    // Return if clicking on the same button
    if(button == current_mRitualButton){
        return
    }

    // Toggle off the previous button clicked state, and toggle on the current button clicked state
    if(current_mRitualButton != null){
        current_mRitualButton.classList.toggle("m-ritual--interaction--button--hollow--clicked");
    }
    button.classList.toggle("m-ritual--interaction--button--hollow--clicked");


    // Run loop bg animation
    let isBgMovingToRight = false;
    
    // Loop through the buttons, if the target button is found before previous button, move bg from left to right
    // Else, move bg from right to left
    for(let i = 0; i < mRitual_interaction_button_hollow_container.childElementCount; i++){

        let currentChild = mRitual_interaction_button_hollow_container.childNodes[i];

        // Next button is before the current button
        if(currentChild == button){
            isBgMovingToRight = true;
            break;
        }
        // Next button is after the current button
        else if(currentChild == current_mRitualButton){
            isBgMovingToRight = false;
            break;
        }
    }

    // Run the animation based on the direction
    if(isBgMovingToRight){
        // Left to right
        mRitual_loopBackgroundOnce(5);
    }
    else{
        // Right to left
        mRitual_loopBackgroundOnce(-5);
    }


    // Update the current button
    current_mRitualButton = button;
    // Update the top drop down text after a delay to let the top drop down is fully hide fiirst
    setTimeout(function(){
        mRitual_interaction_topDropDown_h2.innerHTML = dropDown_title[mRitual_getCurrentButtonIndex()];
    }, 1000);
}

// Find the next button based on the given direction (either 1 or -1), wrap between 0 to maxCount
function mRitual_getNextButton(direction){

    // Loop through the buttons and find the toggled one
    for(let i = 0; i < mRitual_interaction_button_hollow_container.childElementCount; i++){

        // if current button is the toggled one, return the next button
        if(mRitual_interaction_button_hollow_container.childNodes[i] == current_mRitualButton){
            
            let childCount = mRitual_interaction_button_hollow_container.childElementCount;
            // if finding the previous button (direction == -1) and the toggled button is the first button, return the last button
            if(direction < 0 && i == 0){
                return mRitual_interaction_button_hollow_container.childNodes[childCount - 1];
            }
            // else if finding the next button (direction == 1) and the toggled button is the last button, return the first button
            else if(direction > 0 && i == childCount - 1){
                return mRitual_interaction_button_hollow_container.childNodes[0];
            }
            // else, the next button is in range hence return the next button based on direction
            else{
                return mRitual_interaction_button_hollow_container.childNodes[i + direction];
            }
        }
    }

    // if no button is found, log the msg to console
    console.log("No button found");
}

// Assign the shownId to the target content, and call toggleOverlayId_On to toggle it on
function mRitual_toggleCurrentContent_On(){

    let index = mRitual_getCurrentButtonIndex();

    mRitual_interaction_content[index].id = mRitual_interaction_content_shownId;
    toggleOverlayId_On(-1, mRitual_interaction_content_shownId);
}

// Return the index of current page
function mRitual_getCurrentButtonIndex(){
    for(let i = 0; i < mRitual_interaction_button_hollow_container.childElementCount; i++){

        if(mRitual_interaction_button_hollow_container.childNodes[i] == current_mRitualButton){
            return i;
        }
    }
}


///////////////////////////
// Overlay //

// Properties //
const overlays = document.querySelectorAll(".overlay");

// Funcstion Call //

// Hide each overlays at the start
for(let i = 0; i < overlays.length; i++){
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
const debugBtn = document.querySelector("#debug");

// Funcstion Call //


// Funcstion Declaration //

// Move the looping background along x-axis based on the increasement, ends when the first looping background is fully hidden and second looping background is fully shown
// Head rotation is updated and top drop down is hided
function mRitual_loopBackgroundOnce(increasement){

    // If there's already an interval running, reset the current animation and run the new one
    if(loopingBg_intervalId != null){
        mRitual_resetLoopBackgroundProperty();
    }

    let isLeftToRight = increasement > 0;

    // If moving from left to right, start from second loop bg
    if(isLeftToRight){
        loopingBg_posX = -mRitual_interaction_loopingBackgrounds[0].offsetWidth;
    }
    // else, if moving from right to left, start from first loop bg
    else{
        loopingBg_posX = 0;
    }

    loopingBg_intervalId =  setInterval(function(){
        loopingBg_posX += increasement; // Update the pos 
        // update the css position value for each of the loop bg
        for(let i = 0; i < mRitual_interaction_loopingBackgrounds.length; i++){
            mRitual_interaction_loopingBackgrounds[i].style.transform = `translate(${loopingBg_posX}px)`;
        }
        
        // Update character head rotation
        mRitual_updateHeadRotation();

        // Call the reset function if the loop background reached the max / min position
        if( (isLeftToRight && loopingBg_posX >= 0) || (!isLeftToRight && loopingBg_posX <= -mRitual_interaction_loopingBackgrounds[0].offsetWidth)){
            mRitual_resetLoopBackgroundProperty();
        }

    }, 1000 / animationFrameRate);

    // Hide the top drop down
    mRitual_interaction_topDropDown.style.top = 0;
}

// Reset the properties used in mRitual_loopBackgroundOnce and reset head rotation and show the top drop down
function mRitual_resetLoopBackgroundProperty(){

    clearInterval(loopingBg_intervalId); // Clear the interval
    loopingBg_intervalId = null; // Reset the interval id back to null

    // Reset the background position back to 0
    loopingBg_posX = 0;
    for(let i = 0; i < mRitual_interaction_loopingBackgrounds.length; i++){
        mRitual_interaction_loopingBackgrounds[i].style.transform = `translate(${loopingBg_posX}px)`;
    }

    // Reset head rotation
    mRitual_resetHeadRotation();

    // Show the top drop down
    mRitual_interaction_topDropDown.style.top = topDropDown_maxYValue;
}

// Update the head rotation 
function mRitual_updateHeadRotation(){
    // Update the character head rotation
    characterHeadRotation += characterHead_rotateIncreasement;

    // Transform the head
    for(let i = 0; i < mRitual_interaction_character_heads.length; i++){
        mRitual_interaction_character_heads[i].style.transform = `rotate(${characterHeadRotation}deg)`;
    }

    // If the rotation reached the max, flip the direction
    if(Math.abs(characterHeadRotation) >= characterHead_maxRotation){
        characterHead_rotateIncreasement *= -1;
    }
}

// Smooth the head rotation back to 0 from the current rotation
function mRitual_resetHeadRotation(){
    let headRotationIntervalId = setInterval(function(){

        // If the rotation is decresing and reached below 0 
        // OR the rotation is increasing and reached above 0
        // Reset the rotation to 0 and clear the interval
        if(characterHead_rotateIncreasement < 0 && characterHeadRotation < 0 || 
            characterHead_rotateIncreasement > 0 && characterHeadRotation > 0
        ){
            // Reset the rotation back to 0
            characterHeadRotation = 0;

            // Transform the head
            for(let i = 0; i < mRitual_interaction_character_heads.length; i++){
                mRitual_interaction_character_heads[i].style.transform = `rotate(${characterHeadRotation}deg)`;
            }

            // Clear interval
            clearInterval(headRotationIntervalId);
        }
        // Else continue to update the rotation until it reached back to ~0
        else{
            mRitual_updateHeadRotation();
        }
    }, 1000 / animationFrameRate);
}