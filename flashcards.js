document.addEventListener('DOMContentLoaded', function () {
	const flashcardsHtml = localStorage.getItem('flashcardsHtml');
	const flashcardsContainer = document.querySelector('.flashcards-carousel');
	flashcardsContainer.innerHTML = flashcardsHtml || 'No flashcards generated.';

	const flashcards = document.querySelectorAll('.flashcard');

	flashcards.forEach((card) => {
		card.addEventListener('mouseenter', function () {
			showBack(card);
		});

		card.addEventListener('mouseleave', function () {
			hideBack(card);
		});

		card.addEventListener('click', function () {
			showBack(card);
		});
	});

	function showBack(card) {
		card.classList.add('hovered');
	}

	function hideBack(card) {
		card.classList.remove('hovered');
	}
});
function randomColor() {
	// Generate random colors for front and back elements
	const frontColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const backColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

	return { front: frontColor, back: backColor };
}

document.addEventListener('DOMContentLoaded', function () {
	const flashcards = document.querySelectorAll('.flashcard');
	flashcards.forEach((card) => {
		const colors = randomColor();
		card.querySelector('.front').style.backgroundColor = colors.front;
		card.querySelector('.back').style.backgroundColor = colors.back;
		card.style.backgroundColor = 'transparent'; // Set flashcard background color to transparent
	});
});
