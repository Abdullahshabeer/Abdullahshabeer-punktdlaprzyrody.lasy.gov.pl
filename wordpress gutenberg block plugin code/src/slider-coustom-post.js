

const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl,TextControl } = wp.components;
const stringData               = myBlockData.strings;
const siteUrl       = myBlockData.siteUrl;
const { useSelect } = wp.data;
const { useState, useEffect } = wp.element;
import ShortcodeContentPreview from './ShortcodeContentPreview'; 

registerBlockType('giosnamespace/slider-repeater-block', {
    title: stringData.Select_a_post_type,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        postperpage: {
            type: 'number', // Set the type to 'number'
            default: 4,     // Default value for the number of posts per page
          },
        postType: {
            type: 'string',
            default: '', 
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
            default: 'style1', // The default value when the block is first added
        },
        selectdesign: {
            type: 'array',
            default: [
                {
                    value: '', // Unique value for style1
                    label: stringData.selected_style,
                },
                {
                    value: 'style1', // Unique value for style1
                    label: stringData.style + '1', // Concatenate the style variable and '1'
                },
                {
                    value: 'style2', // Unique value for style2
                    label: stringData.style +'2',
                },
                {
                    value: 'style3', // Unique value for style3
                    label: stringData.style +'3',
                },
            ],
        },
        postsectiontitle: {
            type: 'string',
            default: 'Nabory',
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
        const { postsData ,postType, firststyle, postperpage, postsectiontitle, selectedCategory } = attributes;
        
        
        
        return (
            <>
    {firststyle === 'style1' && (  
            <section className="block-row nabory-sec">     
                <div class="container">
                    <div class="web-heading heading-divider">
                    { postsectiontitle &&
                    <h2>{attributes.postsectiontitle}</h2>
                }
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
                { postsectiontitle &&
                    <h2>{attributes.postsectiontitle}</h2>
                }
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
    const { postType, selectedCategory, postsData, selectdesign ,firststyle,postsectiontitle , postsearchtitletitle,searchButtonURL,categoriesslu } = attributes;
    

    const [categoryOptions, setCategoryOptions] = useState(attributes.categoryOptions || []);

    // Function to get post type options
    const getPostTypeOptions = () => {
        const postTypes = wp.data.select('core').getPostTypes({ per_page: -1 });
        const options = [
            {
                value: 'Post', // Add an empty value for the default option
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

    // Function to fetch categories based on the selected post type
    const fetchCategories = async (taxonomyslug) => {
        try {
            let response; // Declare the response variable once here

            if (taxonomyslug === 'category') {
                response = await fetch(siteUrl + `/wp-json/wp/v2/categories`);
            } else {
                response = await fetch(siteUrl + `/wp-json/wp/v2/${taxonomyslug}`);
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
                        label: stringData.Select_Category , // Customize the label for the default option
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
            
            
                const response = await fetch(siteUrl + `/wp-json/wp/v2/types/${postTypeSlug}`);
           
            
            
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
        
        // Fetch posts based on the selected category
        fetchPosts(newCategory, attributes.postType, attributes.categoriesslu, attributes.postperpage);
       
    };
    
    const handleChange = (newPerPage) => {
        // Parse the newPerPage value to an integer or set it to 0 if it's not a valid number
        const parsedPerPage = parseInt(newPerPage) || 0;
        setAttributes({ postperpage: parsedPerPage });
        fetchPosts(selectedCategory, postType, attributes.categoriesslu, parsedPerPage); // Pass parsedPerPage here
    };
    
    // ...
    
    const onPostTypeChange = async (newPostType) => {
        setAttributes({ postType: newPostType, selectedCategory: '', postsData: [] });
           
        const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
        fetchPosts(attributes.selectedCategory, newPostType,taxonomyslug, attributes.postperpage); // Pass attributes.postperpage here
        
        fetchCategories(taxonomyslug); // Fetch categories for the new post type
        setAttributes({ categoriesslu: taxonomyslug });
    };
    
    // ...
    
    const fetchPosts = async (category, postType, categoriesslug, perPage = 4) => {
        try {
            let response;
                let apiEndpoint;
                
                if (category) {
                    if(categoriesslug === 'category'){
                        apiEndpoint = postType === 'post'
                        ? siteUrl + `/wp-json/wp/v2/posts?_embed&categories=${category}&per_page=${perPage}`
                        : siteUrl + `/wp-json/wp/v2/${postType}?_embed&categories=${category}&per_page=${perPage}`;
                    }
                    else{
                        apiEndpoint = postType === 'post'
                        ? siteUrl + `/wp-json/wp/v2/posts?_embed&${categoriesslug}=${category}&per_page=${perPage}`
                        : siteUrl + `/wp-json/wp/v2/${postType}?_embed&${categoriesslug}=${category}&per_page=${perPage}`;
                    }
                    
                } 
                else {
                    apiEndpoint = postType === 'post'
                        ? siteUrl + `/wp-json/wp/v2/posts?_embed&per_page=${perPage}`
                        : siteUrl + `/wp-json/wp/v2/${postType}?_embed&per_page=${perPage}`;
                }

            //     if (perPage === 0) {
            //         apiEndpoint = postType === 'post'
            //             ? siteUrl + `/wp-json/wp/v2/posts?_embed&categories=${category}`
            //             : siteUrl + `/wp-json/wp/v2/${postType}?_embed&categories=${category}`;
            //     } else {
            //         apiEndpoint = postType === 'post'
            //             ? siteUrl + `/wp-json/wp/v2/posts?_embed&categories=${category}&per_page=${perPage}`
            //             : siteUrl + `/wp-json/wp/v2/${postType}?_embed&categories=${category}&per_page=${perPage}`;
            //     }
            // } else {
            //     if (perPage === 0) {
            //         apiEndpoint = postType === 'post'
            //             ? siteUrl + `/wp-json/wp/v2/posts?_embed`
            //             : siteUrl + `/wp-json/wp/v2/${postType}?_embed`;
            //     } else {
            //         apiEndpoint = postType === 'post'
            //             ? siteUrl + `/wp-json/wp/v2/posts?_embed&per_page=${perPage}`
            //             : siteUrl + `/wp-json/wp/v2/${postType}?_embed&per_page=${perPage}`;
            //     }
            // }

                response = await fetch(apiEndpoint);
    
            if (!response.ok) {
                if (response.status === 404) {
                    // Handle the case where the taxonomy does not exist
                    setAttributes({ postsData: [] }); // Set postsData to an empty array
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } else {
                const data = await response.json();
                setAttributes({ postsData: data });
                
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        console.log(postsData)
    };
    function stripHtmlTags(html) {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    }
    function getdateandtime(datetime){
        
        const dateString = datetime;
        


// Create a JavaScript Date object from the date string
const dateObj = new Date(dateString);

// Extract the month (0-based index)
const month = dateObj.getMonth() + 1; // Adding 1 to get the correct month (1-12)

// Extract the date (day of the month)
const date = dateObj.getDate();
var weekday = dateObj.toLocaleString("default", { weekday: "short" })
console.log(weekday);

// Extract the time in HH:MM:SS format
const hours = dateObj.getHours().toString().padStart(2, '0');
const minutes = dateObj.getMinutes().toString().padStart(2, '0');
const seconds = dateObj.getSeconds().toString().padStart(2, '0');

// Format the date, month, and time as needed
const formattedDate = `${date}/${month} ${weekday} <span>|</span> ${hours}:${minutes}`;


return <div dangerouslySetInnerHTML={{ __html: formattedDate }} />;


    }
    function secondtime(datetime){

        const dateString = datetime;

// Create a JavaScript Date object from the date string
const dateObj = new Date(dateString);

// Extract the month (0-based index)
const month = dateObj.getMonth() + 1; // Adding 1 to get the correct month (1-12)

// Extract the date (day of the month)
const date = dateObj.getDate();

// Extract the time in HH:MM:SS format


// Format the date, month, and time as needed
const formattedDate = `${date}.${month}.${dateObj.getFullYear()}`;

return formattedDate;


    }  
    const apiCallback   = siteUrl + '/wp-json/blocks-preview-shortvode/v1/publications_list-custom-post-type';
   

    return (
    
       
    
        <>
           
             
        <InspectorControls>
            <PanelBody title={stringData.Repeater_Settings} >
            <TextControl
                    label={stringData.Section_title}
                    value={attributes.postsectiontitle}
                    onChange={(newTitle) => setAttributes({ postsectiontitle: newTitle })}
                />
               
                <TextControl
                    label={stringData.post_per_page}
                    value={attributes.postperpage ? attributes.postperpage.toString() : ''}
                    onChange={handleChange}
                />
                 <SelectControl
                    label={stringData.Select_a_post_style}
                    value={firststyle}
                    options={ selectdesign}
                    onChange={(newStyle) => setAttributes({ firststyle: newStyle })}
                />
                <SelectControl
                    label={stringData.Selectapost_type}
                    value={postType}
                    options={getPostTypeOptions()}
                    onChange={onPostTypeChange}
                />
                <SelectControl
                    label={stringData.Select_a_category}
                    value={selectedCategory}
                    options={categoryOptions}
                    onChange={onCategoryChange}
                    disabled={!categoryOptions.length}
                />
               
                 <TextControl
                    label={stringData.wyszukiwarki_titlet}
                    value={attributes.postsearchtitletitle}
                    onChange={(newTitle) => setAttributes({ postsearchtitletitle: newTitle })}
                />
                <TextControl
                    label={stringData.Button_URL}
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
				<div class=" owl-theme nabory-carousel">
           {postsData.map((post) => (
               <div className="item" key={post.id}>
               <div class="article-card card-style-1">
                   <div class="article-featured-img">
                   {post._embedded['wp:featuredmedia']?.[0]?.source_url && (
                   <img
                       src={post._embedded['wp:featuredmedia'][0].source_url}
                       alt={post.title.rendered}
                       title={post.title.rendered}
                   />
                   )}
                   </div>
                   <div class="article-content">
                       <h3>{post.title.rendered}</h3>
                       {post._embedded['author']?.[0]?.name && (
                   <div class="author"><span>{post._embedded['author']?.[0]?.name}</span></div>
                   )}
                      
                       <div class="status-recruitment d-flex align-items-center">
                       {post._embedded['wp:term']?.[0]?.[0]?.name && (
                        <div className="status-sec">
                            <span>{post._embedded['wp:term'][0][0].name}</span>
                        </div>
                        )}
                           
                           <span dangerouslySetInnerHTML={{ __html: stripHtmlTags(post.excerpt.rendered) }}></span>
                       </div>
                       <div class="web-btn text-end">
                           <a href={post.link} class="btn btn-primary">szczegóły</a>
                       </div>
                   </div>
               </div>
           </div>
              
           ))}
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
                  <div class=" owl-theme szkolenia-carousel">
                  {postsData.map((post) => (    
                      <div class="item">
                          <div class="article-card card-style-2">
                              <div class="article-featured-img">
                              {post._embedded['wp:featuredmedia']?.[0]?.source_url && (
                                <img
                                    src={post._embedded['wp:featuredmedia'][0].source_url}
                                    alt={post.title.rendered}
                                    title={post.title.rendered}
                                />
                                )}
                              </div>
                              <div class="article-content uu">
                                  <h3>{post.title.rendered}</h3>
                                  {post.excerpt.rendered}
                                  {/* <p dangerouslySetInnerHTML={{ __html: stripHtmlTags(post.excerpt.rendered) }}></p> */}
                                  <div class="article-meta d-flex align-items-center justify-content-between">
                                      <div class="date-location d-flex align-items-center">
                                          <div class="date-sec">{getdateandtime(post.date)}</div>
                                          <div class="location-sec d-flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 18 23" fill="none">
                                            <g id="Group 42612">
                                            <path id="Ellipse 208" d="M18 9C18 15.9706 10 23 9 23C8 23 0 15.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#43516F"/>
                                            <circle id="Ellipse 209" cx="9" cy="9" r="4" fill="#EEF3FF"/>
                                            </g>
                                            </svg>{post.meta.custom_text_field}</div>
                                      </div>
                                      <div class="web-btn text-end">
                                          <a href={post.link} class="btn btn-primary">szczegóły</a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                   ))}    
                      
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
        <div class=" owl-theme aktualnosci-carousel">
        {postsData.map((post) => (    
            <div class="item">
                <div class="article-card card-style-3">
                    <div class="article-featured-img">
                    {post._embedded['wp:featuredmedia']?.[0]?.source_url && (
                                <img
                                    src={post._embedded['wp:featuredmedia'][0].source_url}
                                    alt={post.title.rendered}
                                    title={post.title.rendered}
                                />
                                )}
                    </div>
                    <div class="article-content">
                        <div class="date-sec"><span>{secondtime(post.date)}</span></div>
                        <h3>{post.title.rendered}</h3>
                        <div class="web-btn">
                            <a href={post.title.rendered} class="btn btn-primary">czytaj</a>
                        </div>
                    </div>
                </div>
            </div>
        ))}  
            
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
