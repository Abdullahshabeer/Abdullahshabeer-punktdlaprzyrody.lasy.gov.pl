const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl,CheckboxControl , RadioControl, SelectControl }     = wp.components;
const stringData               = myBlockData.strings;
const siteUrl       = myBlockData.siteUrl;
const { useState, useEffect } = wp.element;
const urlimage                 = myBlockData.defaultimge;
import ShortcodeContentPreview from './ShortcodeContentPreview'; 



registerBlockType('cwbnamespace/tab-post-block', {
  title: stringData.file_Tab,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    tabs: {
      type: 'array',
      default: [
        {
          title: '',
          postType: 'newpost',
          upcomingchecbox: '',
          categories: '',
          postsPerPage: 5,
        },
      ],
    },
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({ attributes }) {
    const { tabs } = attributes;
    return (
      <div className="tab-block-sec">
        <ul className="nav nav-pills align-items-center" id="pills-tab" role="tablist">
          <li className="tab-heading">Wyświetlaj szkolenia:</li>
          {tabs.map((tab, index) => (
            <li key={index} className="nav-item" role="presentation">
              <button
                className={`nav-link ${index === 0 ? 'active' : ''}`}
                id={`tab-btn-${index + 1}`}
                data-bs-toggle="pill"
                data-bs-target={`#tab-${index + 1}`}
                type="button"
                role="tab"
                aria-controls={`tab-${index + 1}`}
                aria-selected={index === 0}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content" id="pills-tabContent">
          {tabs.map((tab, index) => (
            <div key={index} className={`tab-pane fade show ${index === 0 ? 'active' : ''}`} id={`tab-${index + 1}`} role="tabpanel" aria-labelledby={`tab-btn-${index + 1}`} tabIndex="0">
              [get_posts_from_custom_post_type post_type="{tab.postType}" posts_per_page="{tab.postsPerPage}" upcoming_post="{tab.upcomingchecbox}" categories="{tab.categories}"]
            </div>
          ))}
        </div>
      </div>
    );
  },
});

function ImageRepeaterBlockEdit(props) {
  const {setAttributes, attributes } = props
  const { tabs } = attributes;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [postTypeOptions, setPostTypeOptions] = useState([]);

  function updateTabAttribute(index, key, value) {
    const updatedTabs = [...tabs];
    updatedTabs[index][key] = value;
    props.setAttributes({ tabs: updatedTabs });
  }

  function addTab() {
    const newTab = {
      title: '',
      postType: 'post',
      upcomingchecbox: '',
      categories: '',
      postsPerPage: 5,
    };
    props.setAttributes({ tabs: [...tabs, newTab] });
  }

  function removeTab(index) {
    const updatedTabs = [...tabs];
    updatedTabs.splice(index, 1);
    props.setAttributes({ tabs: updatedTabs });
  }

 

  

  const fetchCategories = async (taxonomyslug, tabIndex) => {
    try {
      let response;
  
      if (taxonomyslug === 'category') {
        response = await fetch(siteUrl +`/wp-json/wp/v2/categories`);
        
      } else {
        response = await fetch(siteUrl + `/wp-json/wp/v2/${taxonomyslug}`);
      }
  
      if (!response.ok) {
        if (response.status === 404) {
          // Handle not found response
          updateCategoryOptions([], tabIndex);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const data = await response.json();
        const newCategoryOptions = data.map((category) => ({
          value: category.id,
          label: category.name,
        }));
        const categoryOptionsWithDefault = [
          {
            value: '',
            label: stringData.Select_Category ,
          },
          ...newCategoryOptions,
        ];
        updateCategoryOptions(categoryOptionsWithDefault, tabIndex);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const updateCategoryOptions = (options, tabIndex) => {
    const updatedCategoryOptions = [...categoryOptions];
    updatedCategoryOptions[tabIndex] = options;
    setCategoryOptions(updatedCategoryOptions);
  };

  const onCategoryChange = (newCategory, tabIndex) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex].categories = newCategory;
    setAttributes({ tabs: updatedTabs });
  };
  
  const onPostTypeChange = async (newPostType, tabIndex) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex].postType = newPostType;
    updatedTabs[tabIndex].selectedCategory = '';
    setAttributes({ tabs: updatedTabs });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    fetchCategories(taxonomyslug, tabIndex);
  };

  const getPostTypeOptions = () => {
      const postTypes = wp.data.select('core').getPostTypes({ per_page: -1 });
      const options = [
          {
              value: '', // Add an empty value for the default option
              label: stringData.Select_Post_Type , // Customize the label for the default option
          },
      ];
  
      if (postTypes && postTypes.length > 0) {
          // console.log(postTypes);
          postTypes.forEach((type) => {
              if (type.slug && type.slug!== 'page' && type.slug!== 'attachment' && type.slug!== 'wp_template'&& type.slug!== 'wp_template_part'&& type.slug!== 'wp_navigation'&& type.slug!== 'wp_block'&& type.slug!== 'nav_menu_item') {
              options.push({
                  value: type.slug,
                  label: type.labels.singular_name,
              });
          }
          });
      }
  
      return options;
  };

  const getTaxonomySlugForPostType = async (postTypeSlug) => {
      try {
          const response = await fetch(siteUrl +`/wp-json/wp/v2/types/${postTypeSlug}`);

          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          if (data && data.taxonomies) {
              const taxonomySlug = data.taxonomies[0];
              return taxonomySlug;
          }

          return '';
      } catch (error) {
          console.error('Error fetching taxonomy for post type:', error);
          return '';
      }
  };
  const apiCallback   = siteUrl + '/wp-json/blocks-preview-shortvode/v1/posts-from-custom-post-type';

  return (
    <div className="tab-block-sec">
      <InspectorControls>
        <PanelBody title={stringData.Tab_Block}>
          {tabs.map((tab, index) => (
            <div key={index} className="mb-3">
              <h3>{stringData.Zakdka} {index + 1}</h3>
              <TextControl
                label={stringData.Title}
                placeholder={stringData.Enter_a_title}
                value={tab.title}
                onChange={(value) => updateTabAttribute(index, 'title', value)}
              />
              
              <SelectControl
                  label={stringData.select_post_type}
                  value={tab.postType}
                  options={getPostTypeOptions()}
                  onChange={(value) => onPostTypeChange(value, index)}
                />

                <SelectControl
                  label={stringData.categoriese}
                  value={tab.categories}
                  options={categoryOptions[index] || []}
                  onChange={(value) => onCategoryChange(value, index)}
                  disabled={!categoryOptions[index] || categoryOptions[index].length === 0}
                />
                
      
            <TextControl
              label={stringData.posts_per_page}
              type="number"
              value={tab.postsPerPage}
              onChange={(value) => updateTabAttribute(index, 'postsPerPage', parseInt(value))}
            />
           
            
            <RadioControl
              label={stringData.Select_product}
              selected={tab.upcomingchecbox}
              options={[
                { label: stringData.upcoming, value: 'upcoming' },
                { label: stringData.completed, value: 'completed' },
              ]}
              onChange={(value) => updateTabAttribute(index, 'upcomingchecbox', value)}
            />
              <button onClick={() => removeTab(index)} className="button button-danger">
                {stringData.remove}
              </button>
            </div>
          ))}
          <button onClick={addTab} className="button button-primary">
            {stringData.add_tab}
          </button>
        </PanelBody>
      </InspectorControls>

      <ul className="nav nav-pills align-items-center" id="pills-tab" role="tablist">
        <li className="tab-heading">{stringData.Wyświetlaj}</li>
        {tabs.map((tab, index) => (
          <li key={index} className="nav-item" role="presentation">
            <button
              className={`nav-link ${index === 0 ? 'active' : ''}`}
              id={`tab-btn-${index + 1}`}
              data-bs-toggle="pill"
              data-bs-target={`#tab-${index + 1}`}
              type="button"
              role="tab"
              aria-controls={`tab-${index + 1}`}
              aria-selected={index === 0}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content" id="pills-tabContent">
      {tabs.map((tab, index) => (
            <div key={index} className={`tab-pane fade show ${index === 0 ? 'active' : ''}`} id={`tab-${index + 1}`} role="tabpanel" aria-labelledby={`tab-btn-${index + 1}`} tabIndex="0">
              <ShortcodeContentPreview
                attributes={tab}  // Pass the tab's attributes to ShortcodeContentPreview
                apiCallback={apiCallback}
              />
            </div>
          ))}
      </div>
    </div>
    
  );
}

