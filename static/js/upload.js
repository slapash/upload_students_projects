document.addEventListener('DOMContentLoaded', (event) => {
    let dropArea = document.getElementById('drop_area');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropArea.classList.add('hover');
    }

    function unhighlight(e) {
        dropArea.classList.remove('hover');
    }

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;

        handleFiles(files);
    }

    function handleFiles(files) {
        ([...files]).forEach(uploadFile);
    }

    function uploadFile(file) {
        let dropArea = document.getElementById('drop_area');
        let uploadUrl = dropArea.getAttribute('data-upload-url');
        let indexUrl = dropArea.getAttribute('data-index-url');
        
        let formData = new FormData();
        formData.append('file', file);
    
        fetch(uploadUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(() => {
            alert('File uploaded successfully!');
            window.location.href = indexUrl;
        })
        .catch(() => {
            alert('Upload failed');
        });
    }
    
});
