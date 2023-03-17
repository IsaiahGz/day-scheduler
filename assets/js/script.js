// Data
const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17]

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
	// Iterate through each hour
	const timeBlockListEl = $('#time-block-list')
	for (let i = 0; i < hours.length; i++) {
		timeBlockListEl.append(createTimeBlock(hours[i]))
	}
	// TODO: Add a listener for click events on the save button. This code should
	// use the id in the containing time-block as a key to save the user input in
	// local storage. HINT: What does `this` reference in the click listener
	// function? How can DOM traversal be used to get the "hour-x" id of the
	// time-block containing the button that was clicked? How might the id be
	// useful when saving the description in local storage?
	//
	// TODO: Add code to apply the past, present, or future class to each time
	// block by comparing the id to the current hour. HINTS: How can the id
	// attribute of each time-block be used to conditionally add or remove the
	// past, present, and future classes? How can Day.js be used to get the
	// current hour in 24-hour time?
	//
	// TODO: Add code to get any user input that was saved in localStorage and set
	// the values of the corresponding textarea elements. HINT: How can the id
	// attribute of each time-block be used to do this?
	//
	// TODO: Add code to display the current date in the header of the page.
})

// Create each time block
function createTimeBlock(hour) {
	// Get current time
	const now = dayjs()

	// Create outer element
	const outerDiv = $('<div>')
	outerDiv.attr('id', `hour-${hour}`).addClass('row time-block')

	// Determine if the given hour is current past or present
	if (hour === now.hour()) {
		// Present
		outerDiv.addClass('present')
	} else if (hour < now.hour()) {
		// Past
		outerDiv.addClass('past')
	} else {
		// Future
		outerDiv.addClass('future')
	}

	// Create inner elements
	const innerDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3')
	if (hour > 12) {
		innerDiv.text(`${hour - 12}PM`)
	} else {
		innerDiv.text(`${hour}AM`)
	}

	const textArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3)
	textArea.text(getStorageByHour(hour))

	const btn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save')

	const icon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true')

	btn.append(icon)
	// Add event listener to store event
	btn.click(function () {
		if (textArea.val().trim()) setStorageByHour(hour, textArea.val())
	})

	outerDiv.append(innerDiv)
	outerDiv.append(textArea)
	outerDiv.append(btn)
	return outerDiv
}

function getStorageByHour(hour) {
	const item = localStorage.getItem(hour)
	if (item) return item
	else return ''
}

function setStorageByHour(hour, item) {
	localStorage.setItem(hour, item)
}
