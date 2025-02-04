

const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl,TextControl } = wp.components;
const { useSelect } = wp.data;
const { useState, useEffect } = wp.element;

registerBlockType('giosnamespace/shortcodepost', {
    title: 'selected post type',
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        postperpage: {
            type: 'number', // Set the type to 'number'
            default: 4,     // Default value for the number of posts per page
          },
        postType: {
            type: 'string',
            default: 'select', // Default post type
        },
        categoriesslu: {
            type: 'string',
            default: '', 
        },
        selectedCategory: {
            type: 'string',
            default: '', // Default category
        },
        postsData: {
            type: 'array', // Store fetched posts data
            default: [],
        },
        categoryOptions: {
            type: 'array',
            default: [], // Initialize as an empty array
        },
        firststyle: {
            type: 'string', // The type can be 'string', 'number', or other appropriate types
            default: '', // The default value when the block is first added
        },
        selectdesign: {
            type: 'array',
            default: [
                {
                    value: '', // Unique value for style1
                    label: 'selected design',
                },
                {
                    value: 'style1', // Unique value for style1
                    label: ' style1',
                },
                {
                    value: 'style2', // Unique value for style2
                    label: ' style2',
                },
                {
                    value: 'style3', // Unique value for style3
                    label: 'style3',
                },
            ],
        },
        postsectiontitle: {
            type: 'string',
            default: 'Heading',
        },
       
        postsearchtitletitle: {
            type: 'string',
            default: '',
        },
        searchButtonURL: {
            type: 'string',
            default: '#',
        },
        
    },
    

  

    
    edit: ImageRepeaterBlockEdit,
    save: function ({attributes}) {
        // console.log(attributes);
        const { postsData ,postType, firststyle, postperpage, selectedCategory } = attributes;
        
        
        
        return (
            <>
    {firststyle === 'style1' && (  
            <section className="block-row nabory-sec">     
                <div class="container">
                    <div class="web-heading heading-divider">
                    <h2>{attributes.postsectiontitle}</h2>
                    </div>
                    <div class="carousel-block">
                        <div class="owl-carousel owl-theme nabory-carousel">
                        [display_publications_list post_type="{postType}" posts_per_page="{postperpage}" category ="{selectedCategory}"]
                </div>
            </div>
            {attributes.postsearchtitletitle && 
            
            <div className="web-btn view-all-btn text-end">
                <a href={ attributes.searchButtonURL} className="btn btn-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="6.41667" cy="6.41667" r="5.41667" stroke="#003399" stroke-width="2"/>
                        <path d="M14 14L10.5 10.5" stroke="#003399" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span>{attributes.postsearchtitletitle}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 15" fill="none">
                        <path d="M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169" stroke="#003399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
            }
            
            </div>
        </section>

    )}
           
            
    {firststyle === 'style2' && (   
        <section class="block-row szkolenia-sec light-bg">
          <div class="container">
              <div class="web-heading heading-divider">
              <h2>{attributes.postsectiontitle}</h2>
              </div>
              <div class="carousel-block">
                  <div class="owl-carousel owl-theme szkolenia-carousel">
                     
                  [display_publications_styletwo post_type="{postType}" posts_per_page="{postperpage}" category ="{selectedCategory}"]
                  </div>
              </div>
              {attributes.postsearchtitletitle && 
              <div class="web-btn view-all-btn text-end">
                  <a href={ attributes.searchButtonURL} class="btn btn-transparent">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                          <circle cx="6.41667" cy="6.41667" r="5.41667" stroke="#003399" stroke-width="2"/>
                          <path d="M14 14L10.5 10.5" stroke="#003399" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                      <span>{attributes.postsearchtitletitle}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 15" fill="none">
                          <path d="M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169" stroke="#003399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                  </a>
              </div>
    }
          </div>
       </section>

   )}   
   {firststyle === 'style3' && ( 

        <section class="block-row aktualnosci-sec">
        <div class="container">
            <div class="web-heading heading-divider">
            <h2>{attributes.postsectiontitle}</h2>
            </div>
            <div class="carousel-block">
                <div class="owl-carousel owl-theme aktualnosci-carousel">
                
                [display_publications_stylethree post_type="{postType}" posts_per_page="{postperpage}" category ="{selectedCategory}"]  
                </div>
            </div>
            {attributes.postsearchtitletitle && 
            <div class="web-btn view-all-btn text-end">
                <a href={ attributes.searchButtonURL} class="btn btn-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <circle cx="6.41667" cy="6.41667" r="5.41667" stroke="#003399" stroke-width="2"/>
                        <path d="M14 14L10.5 10.5" stroke="#003399" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span>{attributes.postsearchtitletitle}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 15" fill="none">
                        <path d="M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169" stroke="#003399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
            }
        </div>
        </section>
  
    )}  
         
 </> 
)
    },
});


function ImageRepeaterBlockEdit(props) {
	
    const { setAttributes, attributes } = props;
    const { postType, selectedCategory, postsData, selectdesign,postperpage ,firststyle,postsectiontitle , postsearchtitletitle,searchButtonURL,categoriesslu } = attributes;
    

    const [categoryOptions, setCategoryOptions] = useState(attributes.categoryOptions || []);

    // Function to get post type options
    const getPostTypeOptions = () => {
        const postTypes = wp.data.select('core').getPostTypes({ per_page: -1 });
        const options = [
            {
                value: '', // Add an empty value for the default option
                label: 'Select Post Type', // Customize the label for the default option
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

    // Function to fetch categories based on the selected post type
    const fetchCategories = async (taxonomyslug) => {
        try {
            let response; // Declare the response variable once here

            if (taxonomyslug === 'category') {
                response = await fetch(`/cwbwordpress/wp-json/wp/v2/categories`);
            } else {
                response = await fetch(`/cwbwordpress/wp-json/wp/v2/${taxonomyslug}`);
            }
    
            if (!response.ok) {
                if (response.status === 404) {
                    // Handle the case where the taxonomy does not exist
                    setCategoryOptions([]);
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } else {
                const data = await response.json();
                
                // Map fetched categories to newCategoryOptions
                const newCategoryOptions = data.map((categoryr) => ({
                    value: categoryr.id,
                    label: categoryr.name,
                }));
                const categoryOptionsWithDefault = [
                    {
                        value: '', // Add an empty value for the default option
                        label: 'Select Category', // Customize the label for the default option
                    },
                    ...newCategoryOptions, // Include the fetched categories after the default option
                ];
                // Update the categoryOptions attribute with fetched categories
                setCategoryOptions(categoryOptionsWithDefault);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    
    const getTaxonomySlugForPostType = async (postTypeSlug) => {
        try {
            // Make a request to fetch the post type details
            
            
                const response = await fetch(`/cwbwordpress/wp-json/wp/v2/types/${postTypeSlug}`);
           
            
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            // Check if 'taxonomies' property exists in the response data
            if (data && data.taxonomies) {
                // Assuming that a post type can have multiple taxonomies, you may need to choose one
                // or implement logic to handle multiple taxonomies
                const taxonomySlug = data.taxonomies[0]; // Assuming we take the first taxonomy
                return taxonomySlug;
            }
    
            return ''; // Return an empty string if taxonomies are not found
        } catch (error) {
            console.error('Error fetching taxonomy for post type:', error);
            return ''; // Return an empty string in case of an error
        }
    };

    // Function to update the selected category
    const onCategoryChange = async (newCategory) => {
        setAttributes({ selectedCategory: newCategory });
        
       
    };
    
    const handleChange = (newPerPage) => {
        // Parse the newPerPage value to an integer or set it to 0 if it's not a valid number
        const parsedPerPage = parseInt(newPerPage) || 0;
        setAttributes({ postperpage: parsedPerPage });
       
    };
    
    // ...
    
    const onPostTypeChange = async (newPostType) => {
        setAttributes({ postType: newPostType, selectedCategory: '', postsData: [] });
           
        const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
        fetchCategories(taxonomyslug); // Fetch categories for the new post type
        setAttributes({ categoriesslu: taxonomyslug });
    };
    
    // ...
    
    

    return (
    
       
    
        <>
           
             
        <InspectorControls>
            <PanelBody title="Repeater Settings">
            <TextControl
                    label="Section Title"
                    value={attributes.postsectiontitle}
                    onChange={(newTitle) => setAttributes({ postsectiontitle: newTitle })}
                />
               
                <TextControl
                    label="post section title"
                    value={attributes.postperpage ? attributes.postperpage.toString() : ''}
                    onChange={handleChange}
                />
                 <SelectControl
                    label="Select Design"
                    value={firststyle}
                    options={ selectdesign}
                    onChange={(newStyle) => setAttributes({ firststyle: newStyle })}
                />
                <SelectControl
                    label="Select Post Type"
                    value={postType}
                    options={getPostTypeOptions()}
                    onChange={onPostTypeChange}
                />
                <SelectControl
                    label="Select Category"
                    value={selectedCategory}
                    options={categoryOptions}
                    onChange={onCategoryChange}
                    disabled={!categoryOptions.length}
                />
               
                 <TextControl
                    label="search button Title"
                    value={attributes.postsearchtitletitle}
                    onChange={(newTitle) => setAttributes({ postsearchtitletitle: newTitle })}
                />
                <TextControl
                    label="Button url"
                    value={attributes.searchButtonURL}
                    onChange={(newURL) => setAttributes({ searchButtonURL: newURL })}
                />
            </PanelBody>
        </InspectorControls>
 {firststyle === 'style1' && (  
    <section className="block-row nabory-sec">     
		<div class="container">
			<div class="web-heading heading-divider">
            <h2>{attributes.postsectiontitle}</h2>
			</div>
			<div class="carousel-block">
				<div class="owl-carousel owl-theme nabory-carousel">
                [display_publications_list post_type="{postType}" posts_per_page="{postperpage}" category ="{selectedCategory}"]
           </div>
       </div>
       {attributes.postsearchtitletitle && 
       
       <div className="web-btn view-all-btn text-end">
           <a href={ attributes.searchButtonURL} className="btn btn-transparent">
               <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                   <circle cx="6.41667" cy="6.41667" r="5.41667" stroke="#003399" stroke-width="2"/>
                   <path d="M14 14L10.5 10.5" stroke="#003399" stroke-width="2" stroke-linecap="round"/>
               </svg>
               <span>{attributes.postsearchtitletitle}</span>
               <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 15" fill="none">
                   <path d="M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169" stroke="#003399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
           </a>
       </div>
       }
       
       </div>
  </section>

   )}
           
            
 {firststyle === 'style2' && (   
          <section class="block-row szkolenia-sec light-bg">
          <div class="container">
              <div class="web-heading heading-divider">
              <h2>{attributes.postsectiontitle}</h2>
              </div>
              <div class="carousel-block">
                  <div class="owl-carousel owl-theme szkolenia-carousel">
                  
                  [display_publications_styletwo post_type="{postType}" posts_per_page="{postperpage}" category ="{selectedCategory}"]  
                  </div>
              </div>
              {attributes.postsearchtitletitle && 
              <div class="web-btn view-all-btn text-end">
                  <a href={ attributes.searchButtonURL} class="btn btn-transparent">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                          <circle cx="6.41667" cy="6.41667" r="5.41667" stroke="#003399" stroke-width="2"/>
                          <path d="M14 14L10.5 10.5" stroke="#003399" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                      <span>{attributes.postsearchtitletitle}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 15" fill="none">
                          <path d="M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169" stroke="#003399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                  </a>
              </div>
}
          </div>
      </section>


   )}  
   {firststyle === 'style3' && ( 

<section class="block-row aktualnosci-sec">
<div class="container">
    <div class="web-heading heading-divider">
    <h2>{attributes.postsectiontitle}</h2>
    </div>
    <div class="carousel-block">
        <div class="owl-carousel owl-theme aktualnosci-carousel">
        
        [display_publications_stylethree post_type="{postType}" posts_per_page="{postperpage}" category ="{selectedCategory}"]
        </div>
    </div>
    {attributes.postsearchtitletitle && 
    <div class="web-btn view-all-btn text-end">
        <a href={ attributes.searchButtonURL} class="btn btn-transparent">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="6.41667" cy="6.41667" r="5.41667" stroke="#003399" stroke-width="2"/>
                <path d="M14 14L10.5 10.5" stroke="#003399" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>{attributes.postsearchtitletitle}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 15" fill="none">
                <path d="M1.00017 1.38281L6.61719 6.99983L1.00017 12.6169" stroke="#003399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
    </div>
}
</div>
</section>
  
  )} 
         
 </> 
);
     
   
}
