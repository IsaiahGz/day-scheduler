// Data
const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17]

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
	// Iterate through each hour and append time block to HTML
	const timeBlockListEl = $('#time-block-list')
	for (let i = 0; i < hours.length; i++) {
		timeBlockListEl.append(createTimeBlock(hours[i]))
	}
	// Add todays date to the header
	const now = dayjs()
	$('#currentDay').text(now.format('dddd, MMMM DD'))
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
	if (hour === 12) {
		innerDiv.text('12PM')
	} else if (hour > 12) {
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
		setStorageByHour(hour, textArea.val())
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
