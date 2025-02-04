const { registerBlockType } = wp.blocks;
const { MediaUpload, InspectorControls , RichText, InnerBlocks } = wp.editor;
const { Button, PanelBody,TextareaControl , TextControl,SelectControl,CheckboxControl  } = wp.components;
const { useState } = wp.element;

const stringData = myBlockData.strings;
const imgurl = myBlockData.defaultimge;

registerBlockType('eprojektynamespace/project-idea-question-reject-block', {
  title: stringData.project_idea_rejection_block,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
        type: 'array',
        default: [
          {
           
            nestedItems: [],
          },
        ],
      },
    
  },
  edit: CustomBlockEdit,
  save: function ({ attributes }) {
    const { files, postsectiontitle } = attributes;

    return (
    <>
<div class="quiz-container rejectallquestion ">   
    {files.map((file, parentIndex) => (
            <>
                <div class={`question code${parentIndex}`}>
                {file.nestedItems.map((nestedItem, childIndex) => (
                    <div key={childIndex} class={`question quizdisplayreject childindex${1+childIndex}`} >
                        <div className="quiz-container">
                            <div className="block-with-image light-bg" style={{ background: nestedItem.color }}>
                                <div className={`row align-items-center justify-content-between ${nestedItem.style === 'left' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`col-lg-${nestedItem.fileUrl ? '7' : '12'}`}>
                                        {nestedItem.sectionTitle && (
                                            <div className={"web-heading" + (nestedItem.upcomingchecbox ? " heading-divider" : "")}>
                                                {nestedItem.selectheading && React.createElement(nestedItem.selectheading, { className: nestedItem.sectionTitle }, nestedItem.sectionTitle)}
                                            </div>
                                        )}
                                        {nestedItem.content && <p dangerouslySetInnerHTML={{ __html: nestedItem.content }}></p>}
                                        
                                        {nestedItem.innerbutton && (
                                            <div className="web-btn text-end">
                                                <a href={nestedItem.link} className="btn btn-primary">
                                                    {nestedItem.innerbutton}
                                                </a>
                                            </div>
                                        )}
                                        
                                    </div>
                                    {nestedItem.fileUrl && (
                                        <div className="col-lg-5">
                                            <div className="block-img">
                                                <img src={nestedItem.fileUrl} alt="" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {nestedItem.button && (
                                <div className="web-btn">
                                    <a href={nestedItem.linkexternal} className="btn btn-primary">
                                        {nestedItem.button}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div> 
                ))} 
            </div>
            </> 
        ))}
</div>        
    </>
    );
  },
});


function CustomBlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { files } = attributes;

    

      const addFile = (parentIndex) => {
        // Create a new copy of the files array
        const newFiles = [...files];
      
        // Push a new nested item with default values
        newFiles[parentIndex].nestedItems.push({
          fileUrl: imgurl, // Make sure urlimage is defined
          style: '',
          color: '#eef3ff',
          content: 'Your default content',
          innerbutton: '',
          button: '',
          link: '#',
          linkexternal: '',
          upcomingchecbox: false,
          selectheading: 'h1',
          headings: '',
          sectionTitle: stringData.enter_heading,
        });
      
        // Update the attributes with the new files array
        setAttributes({ files: newFiles });
      };
      const onSelectFile = (media, parentIndex, childIndex) => {
        if (media && media.url) {
            const newFiles = [...files];
          newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url;
          setAttributes({ files: newFiles });
          console.log(files);
        }
      };

    const removeFile = (parentIndex, childIndex) => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems.splice(childIndex, 1);
      setAttributes({ files: newFiles });
    };

    const addSection = () => {
      setAttributes({
        files: [
          ...files,
          {
            
            nestedItems: [],
          },
        ],
      });
    };
    const removeImage = (parentIndex, childIndex) => {
        const newFiles = [...files];
        newFiles[parentIndex].nestedItems[childIndex].fileUrl = ''; // Remove the image URL
        setAttributes({ files: newFiles });
      };

    const removeSection = (parentIndex) => {
      const newFiles = [...files];
      newFiles.splice(parentIndex, 1);
      setAttributes({ files: newFiles });
    };

  return (
    <>
    <div class="quiz-container">
      <InspectorControls>
        <PanelBody title={stringData.rejection}>
          {files.map((file, parentIndex) => (
            <div key={parentIndex} className="mt-2">
              {file.nestedItems.map((nestedItem, childIndex) => (
                <div key={childIndex} className="nested-item mt-2">
                  
                   <div key={childIndex} className="mb-3">
                            <h3>section {childIndex + 1}</h3>
                            <SelectControl
                                label={stringData.heading_style}
                                value={nestedItem.selectheading || 'h1'}
                                options={[
                                    {
                                        value: 'h1',
                                        label: stringData.Heading + '1',
                                    },
                                    {
                                        value: 'h2',
                                        label: stringData.Heading + '2',
                                    },
                                    {
                                        value: 'h3',
                                        label: stringData.Heading + '3',
                                    },
                                    {
                                        value: 'h4',
                                        label: stringData.Heading + '4',
                                    },
                                    {
                                        value: 'h5',
                                        label: stringData.Heading + '5',
                                    },
                                    {
                                        value: 'h6',
                                        label: stringData.Heading + '6',
                                    },
                                ]}
                                onChange={(newTitle) => {
                                    const newFiles = [...files];
                                    newFiles[parentIndex].nestedItems[childIndex].selectheading = newTitle;
                                    setAttributes({ files: newFiles });
                                  }}
                            />
                            <div className="makeUpYourHeadingBlockTypeName">
                                <TextControl
                                    label={stringData.sectiont}
                                    value={nestedItem.sectionTitle}
                                    onChange={(newTitle) => {
                                        const newFiles = [...files];
                                        newFiles[parentIndex].nestedItems[childIndex].sectionTitle = newTitle;
                                        setAttributes({ files: newFiles });
                                      }}
                                />
                            </div>
                            <div>
                                <CheckboxControl
                                    label={stringData.headerdivider}
                                    checked={nestedItem.upcomingchecbox}
                                    onChange={(newTitle) => {
                                        const newFiles = [...files];
                                        newFiles[parentIndex].nestedItems[childIndex].upcomingchecbox = newTitle;
                                        setAttributes({ files: newFiles });
                                      }}
                                />
                            </div>
                            <TextareaControl
                                label={stringData.Enter_a_description}
                                placeholder={stringData.Enter_a_description}
                                value={nestedItem.content}
                                onChange={(newTitle) => {
                                    const newFiles = [...files];
                                    newFiles[parentIndex].nestedItems[childIndex].content = newTitle;
                                    setAttributes({ files: newFiles });
                                  }}
                            />
                            <TextControl
                                label={stringData.Background_color}
                                value={nestedItem.color}
                                onChange={(newTitle) => {
                                    const newFiles = [...files];
                                    newFiles[parentIndex].nestedItems[childIndex].color = newTitle;
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
                                    {nestedItem.fileUrl && <div class="list-icon"><img src={nestedItem.fileUrl} alt="icon" /></div>}
                                    
                                    
                                    </div>
                                    <Button onClick={open} className="button button-primary me-2 mt-3">
                                        {stringData.select_icon}
                                    </Button>
                                    <div className="buttons-wrapper d-flex mt-3">
                                    {nestedItem.fileUrl && (
                                        <Button
                                        className="button button-danger me-2"
                                        onClick={() => removeImage(parentIndex, childIndex)}
                                        >
                                        {stringData.delete_image}
                                        </Button>
                                    )}
                                
                                    
                                    </div>
                                </>
                                )}
                            />
                            


                            <button onClick={() => openMediaLibrary(index)} className="button button-secondary">{stringData.Select_an_image}</button>
                            
                             <TextControl
                                label={stringData.inner_button}
                                value={nestedItem.innerbutton}
                                onChange={(newTitle) => {
                                    const newFiles = [...files];
                                    newFiles[parentIndex].nestedItems[childIndex].innerbutton = newTitle;
                                    setAttributes({ files: newFiles });
                                  }}
                            />
                            
                            <TextControl
                                label={stringData.Button_URLrt}
                                value={nestedItem.link}
                                onChange={(newTitle) => {
                                    const newFiles = [...files];
                                    newFiles[parentIndex].nestedItems[childIndex].link = newTitle;
                                    setAttributes({ files: newFiles });
                                  }}
                            />
                                <TextControl
                                label={stringData.Text_on_the_button}
                                value={nestedItem.button}
                                onChange={(newTitle) => {
                                    const newFiles = [...files];
                                    newFiles[parentIndex].nestedItems[childIndex].button = newTitle;
                                    setAttributes({ files: newFiles });
                                  }}
                            />
                            <TextControl
                                label={stringData.Button_URLextrenal}
                                value={nestedItem.linkexternal}
                                onChange={(newTitle) => {
                                    const newFiles = [...files];
                                    newFiles[parentIndex].nestedItems[childIndex].linkexternal = newTitle;
                                    setAttributes({ files: newFiles });
                                  }}
                            />
                            {/* <button onClick={() => removeItem(index)} className="button button-danger">
                                {stringData.remove}
                            </button> */}
                        </div>
                 
                  <Button className="button button-danger me-2" onClick={() => removeFile(parentIndex, childIndex)}>
                    {stringData.delete_point}
                  </Button> 
                </div>
              ))}

              <div className="mt-2">
                <Button onClick={() => addFile(parentIndex)} className="button button-primary">
                  {stringData.point}
                </Button>
              </div>
              {/* <div className="mt-2">
                <Button className="button button-danger" onClick={() => removeSection(parentIndex)}>
                  {stringData.usun_sekcje}
                </Button>
              </div> */}
            
            </div>
            
            
          ))}
          {/* <div className="mt-4">
            <Button onClick={addSection} className="button button-primary">
              {stringData.add_sectit}
            </Button>
          </div> */}
        </PanelBody>
      </InspectorControls>
    
        {files.map((file, parentIndex) => (
            <>

                <div class={`question code${parentIndex}`}>
                    <p> {stringData.Question}  {1+parentIndex} {stringData.start}</p>
                {file.nestedItems.map((nestedItem, childIndex) => (
                    <div key={childIndex} class={`question childindex${ 1+childIndex}`} >
                       <p> {stringData.Question}  {1+childIndex} {stringData.start}</p>
                        <div className="quiz-container">
                            <div className="block-with-image light-bg" style={{ background: nestedItem.color }}>
                                <div className={`row align-items-center justify-content-between ${nestedItem.style === 'left' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`col-lg-${nestedItem.fileUrl ? '7' : '12'}`}>
                                        {nestedItem.sectionTitle && (
                                            <div className={"web-heading" + (nestedItem.upcomingchecbox ? " heading-divider" : "")}>
                                                {nestedItem.selectheading && React.createElement(nestedItem.selectheading, { className: nestedItem.sectionTitle }, nestedItem.sectionTitle)}
                                            </div>
                                        )}
                                        {nestedItem.content && <p dangerouslySetInnerHTML={{ __html: nestedItem.content }}></p>}
                                        
                                        {nestedItem.innerbutton && (
                                            <div className="web-btn text-end">
                                                <a href={nestedItem.link} className="btn btn-primary">
                                                    {nestedItem.innerbutton}
                                                </a>
                                            </div>
                                        )}
                                        
                                    </div>
                                    {nestedItem.fileUrl && (
                                        <div className="col-lg-5">
                                            <div className="block-img">
                                                <img src={nestedItem.fileUrl} alt="" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {nestedItem.button && (
                                <div className="web-btn">
                                    <a href={nestedItem.linkexternal} className="btn btn-primary">
                                        {nestedItem.button}
                                    </a>
                                </div>
                            )}
                        </div>
                        <p> {stringData.Question} {1+childIndex} {stringData.End} </p>
                    </div> 
                ))} 
                
            </div>
            </> 
        ))}

    
</div>
    </>
  );
}
