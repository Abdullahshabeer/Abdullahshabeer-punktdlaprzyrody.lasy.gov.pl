import { useState, useEffect } from '@wordpress/element';

function ShortcodeContentPreview({ attributes , apiCallback}) {
  const { postType, postsPerPage, categoryID,selectedCategory, displayFilters,postperpage, upcomingchecbox, categories } = attributes;
  const [content, setContent] = useState('');
    //  console.log(attributes);
  useEffect(() => {
    // Make an AJAX request to fetch the content generated by the shortcode
    const fetchContent = async () => {
      try {
        const response = await fetch(apiCallback, {
          method: 'POST', // Use the appropriate HTTP method
          body: JSON.stringify({
            
            postType,  // Use postType from attributes
            postsPerPage,  // Use postsPerPage from attributes
            upcomingchecbox,  // Use upcomingchecbox from attributes
            categories,
           
            categoryID,
            selectedCategory,
            displayFilters,
            postperpage,
            
          }),
          
          headers: {
            'Content-Type': 'application/json',
          },
        });
       
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }

        const data = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error(error);
        setContent('Failed to fetch content');
      }
    };

    fetchContent();
  }, [ upcomingchecbox, categories ,postType, postsPerPage, categoryID, displayFilters, postperpage,selectedCategory]);

  return (
    <div className="shortcode-content-preview">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default ShortcodeContentPreview;
