const { registerBlockType }               = wp.blocks;
const { MediaUpload, InspectorControls , InnerBlocks }  = wp.editor;
const { Button, PanelBody, TextControl , TextareaControl}               = wp.components;
const stringData                          = myBlockData.strings;
import { useInstanceId } from '@wordpress/compose';

registerBlockType('makeupnamespace/file-block', {
  title: stringData.Accordion,      
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: [],
    },
  },
   
  edit: CustomBlockEdit,
  save: function ({ attributes }) {
    const { files } = attributes;
    
    return (
        <div className="accordion-block">
         <div className="accordion" id="accordion-block">
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
                data-bs-parent="#accordion-block"
              >
                <div className="accordion-body">
                       <InnerBlocks.Content />
                {file.sectioncontent && <p  dangerouslySetInnerHTML={{ __html: file.sectioncontent }}></p>}
                {file.nestedItems.map((nestedItem, childIndex) => (
              <div className="block-link-sec" key={childIndex}>
                <a href={nestedItem.fileUrl} className="d-flex align-items-center" download>
                  <div className="icon-sec">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                      <path
                        d="M15.333 10.1815L9.99969 15.4177M9.99969 15.4177L4.66635 10.1815M9.99969 15.4177L9.99969 2M2 20L18 20"
                        stroke="#003399"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p>
                      {nestedItem.title} [{nestedItem.fileName}, {nestedItem.fileSize}]
                    </p>
                  </div>
                </a>
              </div>
            ))}
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
  const { files } = attributes;
  const instanceId = useInstanceId(CustomBlockEdit);

  const onSelectFile = (media, parentIndex, childIndex) => {
    if (media && media.url) {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url;
      newFiles[parentIndex].nestedItems[childIndex].fileSize = media.filesizeHumanReadable;
      newFiles[parentIndex].nestedItems[childIndex].fileName = media.subtype;
      newFiles[parentIndex].nestedItems[childIndex].filetitle = media.filename;
      
      setAttributes({ files: newFiles });
    };
    
  };
 

  

  const addFile = (parentIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.push({
      title: '',
      fileUrl: '',
      fileName: '',
      filetitle: '',
      fileSize: 0,
    });
    setAttributes({ files: newFiles });
  };

 

  const removeFile = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.splice(childIndex, 1);
    setAttributes({ files: newFiles });
  };

  

  const addSection = () => {
    const newUniqueId = `unique-id-${instanceId}-${Date.now()}`;
    setAttributes({
      files: [
        ...files,
        {
          sectiontitle: 'Partnerstwa publiczno – prywatne',
          sectioncontent:
            'Ponadto udział poszczególnych partnerów w ramach projektu partnerskiego nie mogą polegać na oferowaniu towarów, świadczeniu usług lub wykonywaniu robót budowlanych na rzecz pozostałych partnerów – celem tego przepisu jest zabezpieczenie przed omijaniem zasad PZP. W tym rozwiązaniu chodzi o to, że każdy z partnerów musi realizować określone zadania przewidziane z porozumienia/umowy – innymi słowy wymagany jest aktywny i merytoryczny udział partnera w realizacji projektu, ponieważ celem projektu partnerskiego jest zaangażowanie dodatkowych podmiotów w realizację projektu celem osiągnięcia lepszych rezultatów niż byłoby to możliwe, gdyby projekt był realizowany jedynie np. przez partnera wiodącego.',
          nestedItems: [ ], // An array for nested items
          uniqueid: newUniqueId,
        },
      ],
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
                      <MediaUpload
                        onSelect={(media) => onSelectFile(media, parentIndex, childIndex)}
                        type="file"
                        value={nestedItem.fileUrl}
                        render={({ open }) => (
                          <>
                           <h2 className="margin-top" > </h2>
                          {nestedItem.filetitle &&
                           
                            stringData.filename
                          }
                          <h2 className="margin-top" > </h2>
                          <h5 className="margin-top">{nestedItem.filetitle} </h5>
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
                      {stringData.add_file}
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
                <Button onClick={addSection} className="button button-primary">
                  {stringData.add_sectiont}
                </Button>
              </div>
            </PanelBody>
          </InspectorControls>
          <div className="accordion" id="accordion-block">
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
          data-bs-parent="#accordion-block"
        >
          
          <div className="accordion-body">

              {/* <InnerBlocks
                    allowedBlocks={['core/paragraph', 'giosnamespace/podstrony-block']} // Define allowed inner blocks
                    template={[
                      // Define the structure of inner blocks here
                      ['core/paragraph', { placeholder: 'Add your content here' }],
                      ['giosnamespace/podstrony-block', ]
                      // Add more inner blocks as needed
                    ]}
                    // value={file.innerBlocks}
                    // onChange={(newInnerBlocks) => onInnerBlockChange(newInnerBlocks, parentIndex)}
                    value={file.innerBlocks}
                  onChange={(e) => {
                    const newFiles = [...files];
                    newFiles[parentIndex].innerBlocks = e.target.value;
                    setAttributes({ files: newFiles });
                  }}
                  /> */}
            {file.sectioncontent && <p dangerouslySetInnerHTML={{ __html: file.sectioncontent }}></p>}

            {file.nestedItems.map((nestedItem, childIndex) => (
              <div className="block-link-sec" key={childIndex}>
                <a href={nestedItem.fileUrl} className="d-flex align-items-center" download>
                  <div className="icon-sec">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                      <path
                        d="M15.333 10.1815L9.99969 15.4177M9.99969 15.4177L4.66635 10.1815M9.99969 15.4177L9.99969 2M2 20L18 20"
                        stroke="#003399"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p>
                      {nestedItem.title} [{nestedItem.fileName}, {nestedItem.fileSize}]
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  })}
</div>
      </div>
    );
  }



