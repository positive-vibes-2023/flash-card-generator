function generateFlashCards() {
	const fileInput = document.getElementById('fileInput');
	const file = fileInput.files[0];

	if (!file) {
		alert('Please select a file.');
		return;
	}

	const reader = new FileReader();
	reader.onload = function (event) {
		const data = new Uint8Array(event.target.result);
		const workbook = XLSX.read(data, { type: 'array' });

		const sheetName = workbook.SheetNames[0]; // Assuming only one sheet
		const worksheet = workbook.Sheets[sheetName];
		const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

		// Assuming the first row contains headings
		const headings = jsonData.shift();

		const flashcards = jsonData
			.filter((row) => row.some((cell) => cell !== '')) // Ignore empty rows
			.map((row) => {
				const title = row[0]; // First column is the title
				const restOfInfo = row.slice(1); // Rest of the information
				let backContent = '';
				for (let i = 0; i < headings.length - 1; i++) {
					backContent += `<h2 class="info-heading">${
						headings[i + 1]
					}</h2><p class="card-info">${restOfInfo[i]}</p>`;
				}
				return `
                    <div class="flashcard">
                        <div class="front"><h2>${title}</h2></div>
                        <div class="back">${backContent}</div>
                    </div>
                `;
			});

		const flashcardsHtml = flashcards.join('');
		localStorage.setItem('flashcardsHtml', flashcardsHtml); // Store generated flashcards HTML
		window.location.href = 'flashcards.html'; // Redirect to flashcards page
	};

	reader.onerror = function (event) {
		console.error('File could not be read! Code ' + event.target.error.code);
	};

	reader.readAsArrayBuffer(file);
}
