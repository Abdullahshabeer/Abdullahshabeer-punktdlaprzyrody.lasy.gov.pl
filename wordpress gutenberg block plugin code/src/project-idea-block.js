const { registerBlockType } = wp.blocks;
const { MediaUpload, InspectorControls , RichText, InnerBlocks } = wp.editor;
const { Button, PanelBody,TextareaControl , TextControl,SelectControl,CheckboxControl  } = wp.components;
const { useState } = wp.element;

const stringData = myBlockData.strings;
const imgurl = myBlockData.defaultimge;

registerBlockType('eprojektynamespace/project-idea-block', {
  title: stringData.project_idea_block,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
        type: 'array',
        default: [
          {
            sectiontitle: 'Czy Twój projekt dotyczy co najmniej jednego z wymienionych działań?',
            sectionquestion:'<ul className="unordered-list"><li>Ochrona czynna ex-situ oraz in-situ</li> <li>Opracowanie planów, dokumentów strategicznych i planistycznych</li><li>Zwalczanie inwazyjnych gatunków obcych, zielono-niebieskiej infrastruktury</li><li>Mała retencja zw. z ochroną siedlisk i gatunków</li><li>Opracowanie dokumentów planistycznych dla obszarów chronionych</li><li>Zazielenianie terenów miejskich</li><li>Zarządzanie obszarami chronionymi</li><li>Infrastruktura bezpośrednio służąca edukacji: budowa lub rozbudowa bazy edukacyjnej</li><li>Infrastruktura turystyczna, ukierunkowująca ruch turystyczny w celu zmniejszenia antropopresji na obszary chronione</li></ul>',
            upcomingchecbox: false,
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
    {files.map((file, parentIndex) => (
    <div key={parentIndex} id={`code${parentIndex+1 }`} class={`quiz-container questio ${parentIndex === 0 ? '' : 'quizdisplaynone'}`}> 
    <div class="question">
        
      <div class="question-content">
      {file.sectiontitle && (
         <p dangerouslySetInnerHTML={{ __html: file.sectiontitle }}></p>
          )}  
          <div dangerouslySetInnerHTML={{ __html: file.sectionquestion }}></div>
          {file.upcomingchecbox && parentIndex === files.length - 1 && (
            <InnerBlocks.Content />
          )}
      </div>
      <div class="question-option custom-radio-wrap">
          {file.nestedItems.map((nestedItem, childIndex) => (
              <div 
              key={childIndex} 
              id={nestedItem.question ? nestedItem.question : nestedItem.ans}
              className={`custom-radio button${childIndex} ${nestedItem.question ? 'questiontype' : 'Anstype'} ${nestedItem.hint ? 'tooltip-active' : ''}`}
            >
                  <label>
                      <input
                          type="radio"
                          name="question-1"
                          value={`childindex${childIndex}`}
                          checked={childIndex === 0} // Check the first radio button
                      />
                      <span>{nestedItem.title}</span>
                      {nestedItem.hint && (
                  <div class="cwb-tooltip">
                    <button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content={`${nestedItem.hint}`}>?</button>
                  </div>
                     )} 
                  </label>
              </div>
          ))}
       
      </div>
    </div>
  
    <div class= {`question-btn d-flex justify-content-end ${parentIndex === files.length - 1 ? 'buttondisplaynone' : ''}`}>
    <div class={`web-btn ${parentIndex === 0 ? 'quizbuttonremove' : ''}`}>
      <a href="#" id="prev-btn" className="btn btn-transparent prev-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
        <path d="M6.61702 12.6167L1 6.99968L6.61702 1.38266" stroke="#003399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Poprzednie pytanie</span>
      </a>
    </div>
    <div class="web-btn">
      <a href="#" id="next-btn" class="btn btn-primary  next-btn"><span>Następne pytanie</span><svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
          <path d="M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
       </a>
    </div>
  </div>
  </div> 
 ))}
    </>
    );
  },
});


function CustomBlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { files } = attributes;

    const addFile = (parentIndex) => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems.push({
        title: 'New Title',
        hint:'',
        ans: '',
        question: '',
       
      });
      setAttributes({ files: newFiles });
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
            sectiontitle: 'Czy Twój projekt dotyczy co najmniej jednego z wymienionych działań?',
            sectionquestion:'<ul className="unordered-list"><li>Ochrona czynna ex-situ oraz in-situ</li> <li>Opracowanie planów, dokumentów strategicznych i planistycznych</li><li>Zwalczanie inwazyjnych gatunków obcych, zielono-niebieskiej infrastruktury</li><li>Mała retencja zw. z ochroną siedlisk i gatunków</li><li>Opracowanie dokumentów planistycznych dla obszarów chronionych</li><li>Zazielenianie terenów miejskich</li><li>Zarządzanie obszarami chronionymi</li><li>Infrastruktura bezpośrednio służąca edukacji: budowa lub rozbudowa bazy edukacyjnej</li><li>Infrastruktura turystyczna, ukierunkowująca ruch turystyczny w celu zmniejszenia antropopresji na obszary chronione</li></ul>',
            upcomingchecbox: false,
            nestedItems: [],
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
    <div class="quiz-container">
      <InspectorControls>
        <PanelBody title={stringData.Question_block}>
          {files.map((file, parentIndex) => (
            <div key={parentIndex} className="mt-2">
              <TextControl
                type="text"
                label={stringData.description_project}
                placeholder={stringData.Enter_a_description_project}
                value={file.sectiontitle}
                onChange={(newTitle) => {
                  const newFiles = [...files];
                  newFiles[parentIndex].sectiontitle = newTitle;
                  setAttributes({ files: newFiles });
                }}
              />
            <div>
              <TextareaControl
                type="text"
                label={stringData.question_description}
                value={file.sectionquestion}
                onChange={(newTitle) => {
                  const newFiles = [...files];
                  newFiles[parentIndex].sectionquestion = newTitle;
                  setAttributes({ files: newFiles });
                }}
              />
              
            </div> 
            <div>
            {parentIndex === files.length - 1 && (
              <CheckboxControl
                label={stringData.headerdivider}
                checked={file.upcomingchecbox}
                onChange={(newChecked) => {
                  const newFiles = [...files];
                  newFiles[parentIndex].upcomingchecbox = newChecked;
                  setAttributes({ files: newFiles });
                }}
              />
            )}
                
            </div> 
              <h3 className="margintop aad-a-e-e-bdbbc-1v57ksj">{stringData.button}</h3>
              {file.nestedItems.map((nestedItem, childIndex) => (
                <div key={childIndex} className="nested-item mt-2">
                  <TextControl
                    type="text"
                    placeholder={stringData.Enter_a_label}
                    label={stringData.inputlabel}
                    value={nestedItem.title}
                    onChange={(newTitle) => {
                      const newFiles = [...files];
                      newFiles[parentIndex].nestedItems[childIndex].title = newTitle;
                      setAttributes({ files: newFiles });
                    }}
                  />
                   <TextareaControl
                      type="text"
                      label={stringData.hint}
                      value={nestedItem.hint}
                      onChange={(newTitle) => {
                        const newFiles = [...files];
                        newFiles[parentIndex].nestedItems[childIndex].hint = newTitle;
                        setAttributes({ files: newFiles });
                      }}
                    />
                  <TextControl
                    type="number"
                    placeholder={stringData.go_to_ansnumber}
                    label={stringData.ansnumber}
                    value={nestedItem.ans}
                    onChange={(newTitle) => {
                      const newFiles = [...files];
                      newFiles[parentIndex].nestedItems[childIndex].ans = newTitle;
                      setAttributes({ files: newFiles });
                    }}
                  />
                  <TextControl
                    type="number"
                    placeholder={stringData.go_to_question}
                    label={stringData.questionnumber}
                    value={nestedItem.question}
                    onChange={(newTitle) => {
                      const newFiles = [...files];
                      newFiles[parentIndex].nestedItems[childIndex].question = newTitle;
                      setAttributes({ files: newFiles });
                    }}
                  />
                  
                   
                 
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
              <div className="mt-2">
                <Button className="button button-danger" onClick={() => removeSection(parentIndex)}>
                  {stringData.usun_sekcje}
                </Button>
              </div>
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
    <>
   <div class= 'border'> 
    <p> question {parentIndex+1}</p>
  </div>
    <div class="question">
        
      <div class="question-content">
      {file.sectiontitle && (
          <p dangerouslySetInnerHTML={{ __html: file.sectiontitle }}></p>
          )}  
          <div dangerouslySetInnerHTML={{ __html: file.sectionquestion }}></div>
         
          {file.upcomingchecbox && parentIndex === files.length - 1 && (
            <InnerBlocks />
          )}
      </div>
      <div class="question-option custom-radio-wrap">
      {file.nestedItems.map((nestedItem, childIndex) => (
           <div 
           key={childIndex} 
           data-typenumber =  {nestedItem.question ? nestedItem.question : nestedItem.ans}
           id={nestedItem.question ? nestedItem.question : nestedItem.ans}
           data-type={`${nestedItem.question ? 'questiontype' : 'Anstype'}`}
           className={`custom-radio button${childIndex} ${nestedItem.question ? 'questiontype' : 'Anstype'} ${nestedItem.hint ? 'tooltip-active' : ''}`}
         >
              <label>
                  <input
                      type="radio"
                      name="question-1"
                      value={`childindex${childIndex}`}
                      // checked={childIndex === 0} // Check the first radio button
                  />
                  <span>{nestedItem.title}</span>
                  {nestedItem.hint && (
                  <div class="cwb-tooltip">
                    <button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content={`${nestedItem.hint}`}>?</button>
                  </div>
                     )}       
              </label>
          </div>
      ))}
       
      </div>
    </div>
  
    <div class= {`question-btn d-flex justify-content-end ${parentIndex === files.length - 1 ? 'buttondisplaynone' : ''}`}>
    <div class={`web-btn ${parentIndex === 0 ? 'quizbuttonremove' : ''}`}>
    <a href="#" id="prev-btn" className="btn btn-transparent">
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
      <path d="M6.61702 12.6167L1 6.99968L6.61702 1.38266" stroke="#003399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Poprzednie pytanie</span>
    </a>
    </div>
    <div class="web-btn">
    {/* changebackgroundcolor */}
      <a href="#"  id="next-btn" class="btn btn-primary "><span>Następne pytanie</span><svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
          <path d="M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
       </a>
    </div>
  </div>
 
  </> 
 ))}

    
</div>
    </>
  );
}
