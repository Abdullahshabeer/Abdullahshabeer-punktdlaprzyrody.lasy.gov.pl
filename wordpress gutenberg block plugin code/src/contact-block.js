const { registerBlockType } = wp.blocks;
const { MediaUpload, InspectorControls } = wp.editor;
const { Button, PanelBody,TextareaControl , TextControl,SelectControl,CheckboxControl } = wp.components;
const { useState } = wp.element;

const stringData = myBlockData.strings;
const imgurl = myBlockData.defaultimge;

registerBlockType('eprojektynamespace/benefits', {
  title: stringData.contact_block,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: [
        {
          sectiontitle: 'Dane kontaktowe',
          upcomingchecbox: false,
          selectheading: '',
          sectioncontent:'lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis mauris sed sem lobortis, vitae dignissim urna ',
          coloumnsize: 6,
          nestedItems: [], // An array for nested items
          shortcode: '',
        },
      ],
    },
    postsectiontitle: {
      type: 'string',
      default: '',
    },
  },
  edit: CustomBlockEdit,
  save: function ({ attributes }) {
    const { files, postsectiontitle } = attributes;

    return (
    <>
     <div class="kontakt-osoby-block">
        <div class="row">     
           
                {files.map((file, parentIndex) => (
                <div class={`col-lg-${file.coloumnsize}`} key={parentIndex} > 
                <div class="kontakt-osoby-card light-bg">
                {file.sectiontitle && (
                    (file.selectheading ? <div className={"web-heading" + (file.upcomingchecbox ? " heading-divider" : "")}>
                    {file.selectheading && React.createElement(file.selectheading, { className: file.sectiontitle }, file.sectiontitle)}
                </div> : 
                <div className={"web-heading" + (file.upcomingchecbox ? " heading-divider" : "")}>
                    <h1> {file.sectiontitle}</h1>
                
            </div> )
                
                                            )}
                  
                  <div class="contact-detail">
                  {file.sectioncontent && (  
                    <p>{file.sectioncontent}</p>
                    )}
                    <ul>
                      {file.nestedItems.map((nestedItem, childIndex) => (
                        <li>
                          {nestedItem.fileUrl && (
                            <img src={nestedItem.fileUrl} alt="icon" />
                          )}
                           {nestedItem.url ? <a href={nestedItem.url} dangerouslySetInnerHTML={{ __html: nestedItem.title }} /> : <a  dangerouslySetInnerHTML={{ __html: nestedItem.title }} />}
                          
                        </li>
                      ))}
                    </ul>
                  </div>
                  {file.shortcode &&
                   <div class="map-sec">{file.shortcode}</div>
                  }
                 
                </div>
            </div> 
              ))}
         </div>  
     </div>
      
    </>  
    );
  },
});

function CustomBlockEdit(props) {
  const { attributes, setAttributes } = props;
  const { files, postsectiontitle } = attributes;

  const onSelectFile = (media, parentIndex, childIndex) => {
    if (media && media.url) {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url;
      newFiles[parentIndex].nestedItems[childIndex].imgalt = media.alt;
      setAttributes({ files: newFiles });
     
    }
  };

  const addFile = (parentIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.push({
      title: 'podwyższenie skuteczności opieki medycznej i jakości usług medycznych świadczonych w regionie,',
      url: '',
      imgalt: '',
      fileUrl: imgurl,
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
  const removeImage = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems[childIndex].fileUrl = ''; // Remove the image URL
    setAttributes({ files: newFiles });
  };

  const addSection = () => {
    setAttributes({
      files: [
        ...files,
        {
          sectiontitle: 'Dane kontaktowe',
          upcomingchecbox: false,
          selectheading: '',
          sectioncontent:'lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis mauris sed sem lobortis, vitae dignissim urna ',
          coloumnsize: 6,
          nestedItems: [], // An array for nested items
          shortcode: '',
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
    <>
     <div class="kontakt-osoby-block">
    <div class="row">
      <InspectorControls>
        <PanelBody title={stringData.contact_block}>
          {files.map((file, parentIndex) => (
            <div key={parentIndex} className="mt-2">
              
              <TextControl
                type="text"
                label={stringData.Title}
                placeholder={stringData.Enter_a_title}
                value={file.sectiontitle}
                onChange={(newTitle) => {
                  const newFiles = [...files];
                  newFiles[parentIndex].sectiontitle = newTitle;
                  setAttributes({ files: newFiles });
                }}
              />
                <SelectControl
                    label={stringData.heading_style}
                    className="margintop"
                    value={file.selectheading || 'h1'}
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
                    onChange={(newStyle) => {
                        const newFiles = [...files];
                        newFiles[parentIndex].selectheading = newStyle;
                        setAttributes({ files: newFiles });
                    }}
                    />

                   <div>
                   <CheckboxControl
                        label={stringData.headerdivider}
                        checked={file.upcomingchecbox}
                        onChange={(newChecked) => {
                            const newFiles = [...files];
                            newFiles[parentIndex].upcomingchecbox = newChecked;
                            setAttributes({ files: newFiles });
                        }}
                        />
                    </div>
              
             
              <TextareaControl
                placeholder={stringData.Enter_a_description}
                label= {stringData.description}
                value={file.sectioncontent}
                onChange={(newContent) => {
                  const newFiles = [...files];
                  newFiles[parentIndex].sectioncontent = newContent;
                  setAttributes({ files: newFiles });
                }}
              />
              <TextControl
                type="text"
                label={stringData.Column_size}
                value={file.coloumnsize}
                onChange={(newTitle) => {
                  const newFiles = [...files];
                  newFiles[parentIndex].coloumnsize = newTitle;
                  setAttributes({ files: newFiles });
                }}
              />
             
              
              <h3 className="margintop aad-a-e-e-bdbbc-1v57ksj">{stringData.Nested_rowr}</h3>
              {file.nestedItems.map((nestedItem, childIndex) => (
                <div key={childIndex} className="nested-item mt-2">
                  <TextControl
                    type="text"
                    placeholder={stringData.Title}
                    label={stringData.description}
                    value={nestedItem.title}
                    onChange={(newTitle) => {
                      const newFiles = [...files];
                      newFiles[parentIndex].nestedItems[childIndex].title = newTitle;
                      setAttributes({ files: newFiles });
                    }}
                  />
                  <TextControl
                    type="text"
                    placeholder={stringData.enter_urlrt}
                    label={stringData.addlink}
                    value={nestedItem.url}
                    onChange={(newTitle) => {
                      const newFiles = [...files];
                      newFiles[parentIndex].nestedItems[childIndex].url = newTitle;
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
                       
                          <Button className="button button-danger me-2" onClick={() => removeFile(parentIndex, childIndex)}>
                            {stringData.delete_point}
                          </Button>
                        </div>
                      </>
                    )}
                  />
                </div>
              ))}

              <div className="mt-2">
                <Button onClick={() => addFile(parentIndex)} className="button button-primary">
                  {stringData.point}
                </Button>
              </div>
              <div className="mt-2">
                <Button className="button button-danger" onClick={() => removeSection(parentIndex)}>
                  {stringData.usun_sekcje}
                </Button>
              </div>
              <TextControl
                
                label= {stringData.mapshortcode}
                value={file.shortcode}
                onChange={(newContent) => {
                  const newFiles = [...files];
                  newFiles[parentIndex].shortcode = newContent;
                  setAttributes({ files: newFiles });
                }}
              />
            </div>
            
          ))}
          <div className="mt-4">
            <Button onClick={addSection} className="button button-primary">
              {stringData.add_sectit}
            </Button>
          </div>
        </PanelBody>
      </InspectorControls>
      {files.map((file, parentIndex) => (
       <div class={`col-lg-${file.coloumnsize}`} key={parentIndex} > 
        <div class="kontakt-osoby-card light-bg">
        {file.sectiontitle && (
            (file.selectheading ? <div className={"web-heading" + (file.upcomingchecbox ? " heading-divider" : "")}>
            {file.selectheading && React.createElement(file.selectheading, { className: file.sectiontitle }, file.sectiontitle)}
        </div> : 
        <div className={"web-heading" + (file.upcomingchecbox ? " heading-divider" : "")}>
            <h1> {file.sectiontitle}</h1>
        
    </div> )
        
                                    )}
          
          <div class="contact-detail">
          {file.sectioncontent && (  
            <p>{file.sectioncontent}</p>
            )}
            <ul>
              {file.nestedItems.map((nestedItem, childIndex) => (
                <li>
                  {nestedItem.fileUrl && (
                    <img src={nestedItem.fileUrl} alt="icon" />
                  )}
                  {nestedItem.url ? <a href={nestedItem.url} dangerouslySetInnerHTML={{ __html: nestedItem.title }} /> : nestedItem.title}
                  
                  
                </li>
              ))}
            </ul>
          </div>
          {file.shortcode &&
           <div class="map-sec">{file.shortcode}</div>
          }
         
        </div>
    </div>    
      ))}
    </div>  
</div>    
    </>
  );
}
