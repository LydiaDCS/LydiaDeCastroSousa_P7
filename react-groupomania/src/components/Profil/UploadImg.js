import React from 'react';

const uploadimg = () => {
  const handlePicture=(e)=>{
  e.preventDefault();
  }
  return (
    <div>
       <form action="" onSubmit={handlePicture} className="upload-pic">
        <label htmlFor='file'>Changer d'image</label>
        <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png"/>
      </form>
    </div>
  );
};

export default uploadimg;