const { registerBlockType }               = wp.blocks;
const { MediaUpload, InspectorControls , InnerBlocks }  = wp.editor;
const { Button, PanelBody, TextControl , TextareaControl}               = wp.components;
const stringData                          = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;
import { useInstanceId } from '@wordpress/compose';

// function generateUniqueId() {
//   return 'unique-id-' + Math.floor(Math.random() * 10000); // You can use a more robust method for generating unique IDs if needed
// }

registerBlockType('makeupnamespace/section-block', {
  title: stringData.Accordion_inner_section,      
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: [], 
    },

    uniqueidto: {
      type: 'string',
      default: 'rrrtttr', // Assuming you want a blank string as default; adjust as needed
    },
    
  },
  
  edit: CustomBlockEdit,
  save: function ({ attributes }) {
    const { files , uniqueidto  } = attributes;
    // const uniqueId = Date.now();
    
    return (
        <div className="accordion-block">
         <div className="accordion" id={uniqueidto}>
          {files.map((file, parentIndex) => (
            <div className="accordion-item" key={parentIndex}>
              <h3 className="accordion-header">
                <button
                 className={`accordion-button collapsed ${parentIndex === 0 ? '' : 'collapsed'}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${file.uniqueid}`}
                  aria-expanded="true"
                  aria-controls={`collapse-${file.uniqueid}`}
                >
                  {file.sectiontitle}
                </button>
              </h3>
              <div
                id={`collapse-${file.uniqueid}`}
                className={`accordion-collapse collapse `}
                data-bs-parent={`#${uniqueidto}`}
              >
                  <div className="accordion-body">
          <div class="podstrony-block">
            <div class="row">
          {file.nestedItems.map((nestedItem, childIndex) => (
               <div class="col-xl-6 col-md-6" key={childIndex}>
                    <div class="podstrony-card">
                        <a href={nestedItem.url} class="podstrony-card-inner d-flex align-items-center flex-column">
                            <div class="card-icon"> {nestedItem.fileUrl && <img src={nestedItem.fileUrl} alt="icon" />}</div>
                            <h3>{nestedItem.title}</h3>
                        </a>
                    </div>
                </div> 
            ))}
             </div>
        </div>
        <InnerBlocks.Content />
            {file.sectioncontent && <p dangerouslySetInnerHTML={{ __html: file.sectioncontent }}></p>}
          </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
});

const { useState } = wp.element;

function CustomBlockEdit(props) {
  const { attributes, setAttributes } = props;
  const { files , uniqueidto } = attributes;
  const instanceId = useInstanceId(CustomBlockEdit);
  // const uniqueId = Date.now();

  const onSelectFile = (media, parentIndex, childIndex) => {
    if (media && media.url) {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url;
      newFiles[parentIndex].nestedItems[childIndex].fileSize = media.filesizeHumanReadable;
      newFiles[parentIndex].nestedItems[childIndex].fileName = media.subtype;

      setAttributes({ files: newFiles });
    };
  };
  

  

  const addFile = (parentIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.push({
      title: '',
      fileUrl: '',
      fileName: '',
      fileSize: 0,
    });
    setAttributes({ files: newFiles });
  };

  

  const removeFile = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.splice(childIndex, 1);
    setAttributes({ files: newFiles });
  };

  function generateCurrentTimeWithSeconds() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
  
    return `${hours}:${minutes}:${seconds}`;
  }

  const addSection = () => {
    const newUniqueId = `unique-id-${instanceId}-${Date.now()}`;
    const newUniqueIdto = `unique-idto-${instanceId}-${Date.now()}`;
  
    setAttributes({
      files: [
        ...files,
        {
          sectiontitle: 'Partnerstwa publiczno – prywatne',
          sectioncontent: '... long text ...',
          nestedItems: [
            {
              fileUrl: urlimage,
              title: 'Program SZOP',
              url: '#',
            },
          ],
          uniqueid: newUniqueId,
        },
      ],
      uniqueidto: newUniqueIdto, // Corrected attribute name and combined update
    });
  };
  
  

  const removeSection = (parentIndex) => {
    const newFiles = [...files];
    newFiles.splice(parentIndex, 1);
    setAttributes({ files: newFiles });
  };

      return (
        <div className="accordion-block">
          <InspectorControls>
            <PanelBody title={stringData.Accordion_File_Block}>
              {files.map((file, parentIndex) => (
                <div key={parentIndex} className="mt-2">
                  <h3>{stringData.Title}</h3>
                  <input
                    type="text"
                    placeholder={stringData.Enter_a_title}
                    className="form-control"
                    value={file.sectiontitle}
                    onChange={(e) => {
                      const newFiles = [...files];
                      newFiles[parentIndex].sectiontitle = e.target.value;
                      setAttributes({ files: newFiles });
                    }}
                  />
                  <h3 className="margintop">{stringData.description}</h3>
                  <textarea
                    placeholder={stringData.Enter_a_description}
                    value={file.sectioncontent}
                    className="form-control"
                    rows={10} // Set the number of rows to 20
                    onChange={(e) => {
                      const newFiles = [...files];
                      newFiles[parentIndex].sectioncontent = e.target.value;
                      setAttributes({ files: newFiles });
                    }}
                  ></textarea>
                  <h3 className="margintop">{stringData.File_title}</h3>
                  {file.nestedItems.map((nestedItem, childIndex) => (
                    <div key={childIndex} className="nested-item mt-2">
                      <input
                        type="text"
                        placeholder={stringData.Enter_a_title}
                        className="form-control"
                        value={nestedItem.title}
                        onChange={(e) => {
                            const newFiles = [...files];
                            newFiles[parentIndex].nestedItems[childIndex].title = e.target.value;
                            setAttributes({ files: newFiles });
                          }}
                      />
                       <h3 className="margintop">{stringData.enter_url}</h3>
                       <input
                        type="text"
                       
                        className="form-control"
                        value={nestedItem.url}
                        onChange={(e) => {
                            const newFiles = [...files];
                            newFiles[parentIndex].nestedItems[childIndex].url = e.target.value;
                            setAttributes({ files: newFiles });
                          }}
                      />
                      <MediaUpload
                        onSelect={(media) => onSelectFile(media, parentIndex, childIndex)}
                        type="file"
                        value={nestedItem.fileUrl}
                        render={({ open }) => (
                          <>
                            <div className="buttons-wrapper d-flex mt-3">
                              <Button onClick={open} className="button button-primary me-2">
                                {nestedItem.fileUrl ? stringData.Change_file : stringData.choose_a_file }
                              </Button>
                              <Button className="button button-danger" onClick={() => removeFile(parentIndex, childIndex)}>
                                {stringData.remove}
                              </Button>
                            </div>
                          </>
                        )}
                      />
                    </div>
                  ))}
                  <div className="mt-2">
                    <Button onClick={() => addFile(parentIndex)} className="button button-primary">
                      {stringData.add_sectiont}
                    </Button>
                  </div>
                  
                  <div className="mt-2">
                    <Button className="button button-danger" onClick={() => removeSection(parentIndex)}>
                      {stringData.Delete_a_section}
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                
              {files.length === 0 && (
                    <Button onClick={addSection} className="button button-primary">
                      {stringData.add_a_section}
                    </Button>
                 ) }
            </div>
            </PanelBody>
          </InspectorControls>
          <div className="accordion" id={uniqueidto}>
  {files.map((file, parentIndex) => {
    // Generate a unique clientId for each repeated parent block
    const clientId = `inner-block-${parentIndex}`;

    return (
      <div className="accordion-item" key={parentIndex}>
        <h3 className="accordion-header">
          <button
            className={`accordion-button collapsed ${parentIndex === 0 ? '' : 'collapsed'}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${file.uniqueid}`}
            aria-expanded="true"
            aria-controls={`collapse-${file.uniqueid}`}
          >
            {file.sectiontitle}
          </button>
        </h3>
        <div
          id={`collapse-${file.uniqueid}`}
          className={`accordion-collapse collapse `}
          data-bs-parent={`#${uniqueidto}`}
        >
          
        <div className="accordion-body">
          <div class="podstrony-block">
            <div class="row">
          {file.nestedItems.map((nestedItem, childIndex) => (
               <div class="col-xl-6 col-md-6" key={childIndex}>
                    <div class="podstrony-card">
                        <a href={nestedItem.url} class="podstrony-card-inner d-flex align-items-center flex-column">
                            <div class="card-icon"> {nestedItem.fileUrl && <img src={nestedItem.fileUrl} alt="icon" />}</div>
                            <h3>{nestedItem.title}</h3>
                        </a>
                    </div>
                </div> 
            ))}
             </div>
        </div>
        <InnerBlocks/>
            {file.sectioncontent && <p dangerouslySetInnerHTML={{ __html: file.sectioncontent }}></p>}
          </div>
        </div>
      </div>
    );
  })}
</div>
      </div>
    );
  }



