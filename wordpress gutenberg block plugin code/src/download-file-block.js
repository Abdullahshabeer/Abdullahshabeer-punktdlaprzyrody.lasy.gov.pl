const { registerBlockType }               = wp.blocks;
const { MediaUpload, InspectorControls }  = wp.editor;
const { Button, PanelBody }               = wp.components;
const stringData                          = myBlockData.strings;

registerBlockType('makeupnamespace/download-file-block', {
  title: stringData.download_file_block,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: [
        { title: 'TYTUŁ', fileUrl: '', fileName: '', fileSize: 0 }
      ],
    },
  },
  edit: CustomBlockEdit,
  save: function ({ attributes }) {
    const { files } = attributes;
    return (
        <>
         {files.map((file, index) => (
            <div class="block-link-sec" key={index}>
                 <a href={file.fileUrl} class="d-flex align-items-center" download>
                     <div class="icon-sec">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                         <path d="M15.333 10.1815L9.99969 15.4177M9.99969 15.4177L4.66635 10.1815M9.99969 15.4177L9.99969 2M2 20L18 20" stroke="#003399" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                     </div>
                     <div>
                         <p>{file.title} [{file.fileName}, {file.fileSize}]</p>
                     </div>
                 </a>
           </div>
            ))}
        </>
    );
  },
});

const { useState } = wp.element;

function CustomBlockEdit(props) {
  const { attributes, setAttributes } = props;
  const { files } = attributes;

  // const onSelectFile = (media, index) => {
  //   if (media && media.url) {
  //       console.log(media);
  //     const newFiles = [...files];
  //     newFiles[index].fileUrl = media.url;
  //     newFiles[index].fileSize = media.filesizeHumanReadable;
  //     newFiles[index].fileName = media.subtype;
  //     newFiles[index].filetitle = media.filename;
  //     setAttributes({ files: newFiles });
  //   }
  // };
  const onSelectFile = (media, index) => {
    if (media && media.url) {
      const newFiles = [...files];
      newFiles[index].fileUrl = media.url;
      newFiles[index].fileSize = media.filesizeHumanReadable;
      newFiles[index].filetitle = media.filename;
  
      // Extract the file extension from the filename (get the last part after the last dot)
      const fileExtension = media.filename.split('.').pop();
      newFiles[index].fileName = fileExtension;
  
      setAttributes({ files: newFiles });
    }
  };

  const addFile = () => {
    setAttributes({
      files: [...files, { title: 'TYTUŁ', fileUrl: '', fileName: '', filetitle:'' , fileSize: 0 }],
    });
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setAttributes({ files: newFiles });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={stringData.File_Block_Settings}>
          {files.map((file, index) => (
            <div key={index} className="mt-2">
              <h3>{stringData.Title}</h3>
              <input
                type="text"
                value={file.title}
                className="form-control"
                onChange={(e) => {
                  const newFiles = [...files];
                  newFiles[index].title = e.target.value;
                  setAttributes({ files: newFiles });
                }}
              />
              <h2 className="margin-top" > </h2>
              {file.filetitle &&
                
                stringData.filename
              }
              <h1 className="margin-top">{file.filetitle} </h1>
              <MediaUpload
                onSelect={(media) => onSelectFile(media, index)}
                type="file"
                value={file.fileUrl}
                render={({ open }) => (
                  <>
                    <div className="buttons-wrapper d-flex mt-3">
                        <Button onClick={open} className="button button-primary me-2">
                        {file.fileUrl ? stringData.Change_file : stringData.choose_a_file}
                        </Button>
                        <Button className="button button-danger" onClick={() => removeFile(index)}>{stringData.delete_file}</Button>
                    </div>
                  </>
                )}
              />
            </div>
          ))}
          <div className="mt-4">
            <Button onClick={addFile} className="button button-primary">{stringData.file_new_file}</Button>
          </div>
        </PanelBody>
      </InspectorControls>
      
      {files.map((file, index) => (
            <div class="block-link-sec" key={index}>
                 <a href={file.fileUrl} class="d-flex align-items-center" download>
                     <div class="icon-sec">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                         <path d="M15.333 10.1815L9.99969 15.4177M9.99969 15.4177L4.66635 10.1815M9.99969 15.4177L9.99969 2M2 20L18 20" stroke="#003399" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                     </div>
                     <div>
                         <p>{file.title} [{file.fileName}, {file.fileSize}]</p>
                     </div>
                 </a>
           </div>
            ))}
        
    </>
  );
}
