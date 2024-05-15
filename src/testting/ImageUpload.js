import React, { useState } from "react";

function ImageUpload() {
    const [imageEmbedURI, updateImageEmbedURI] = useState();

    async function uploadToServer(event) {
        event.preventDefault();
        const imageFile = event.target.files[0];

        if (imageFile) {
            // Update image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                updateImageEmbedURI(e.target.result);
            };
            reader.readAsDataURL(imageFile);

            // Prepare form data
            const formData = new FormData();
            formData.append("photo", imageFile);

            // Send image file to server
            let baseUrl = process.env.REACT_APP_SERVER_BASE_URL;
            const response = await fetch(`${baseUrl}/media/uploadImage`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Image uploaded successfully');
            } else {
                alert('Image upload failed');
            }
        } else {
            alert('No image selected');
        }
    }

    return (
        <div>
            <form>
                <label>Upload Image by Form</label>
                <br /><br />
                <input type="file" onChange={(event) => { uploadToServer(event) }} />
                {imageEmbedURI && <img src={imageEmbedURI} alt="Selected" />}
                {imageEmbedURI && <p className="col-lg-3">{imageEmbedURI}</p>}
            </form>
        </div>
    );
}

export default ImageUpload;
