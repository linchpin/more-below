/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	InspectorControls,
    MediaUploadCheck,
    MediaUpload,
	useBlockProps,
	RichText,
	PanelColorSettings,
	getColorClassName,
} from '@wordpress/block-editor';

import { Panel, PanelBody, PanelRow, TextControl, Placeholder, ResponsiveWrapper, Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { more } from '@wordpress/icons';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {

  const blockProps = useBlockProps();

  const { attributes, setAttributes, iconColor, textColor, setIconColor, setTextColor } = props;

  const onSelectMedia = (media) => {
    setAttributes({
      mediaId: media.id,
      mediaUrl: media.url
    });
  }

  const onRemoveMedia = (media) => {
    setAttributes({
      mediaId: 0,
      mediaUrl: ""
    });
  }

	const onSetColor = (color) => {
		setAttributes({
			backgroundColor: color,
		});
	}

	const onChangeAnchor = (anchor) => {
		setAttributes({
			anchor: anchor,
		});
	}

	return (
    <>
      <InspectorControls>
		 <pre>{JSON.stringify(props, '', "\t")}</pre>
		<PanelColorSettings
			title={__('Icon Color', 'more-below')}
			colorSettings={[
				{
					value: iconColor.color,
					onChange: setIconColor,
					label: __('Icon Color', 'more-below')
				},
				{
					value: textColor.color,
					onChange: setTextColor,
					label: __('Text Color', 'more-below')
				},
			]}
		/>
		  <PanelBody
			  title={__('More Settings', 'more-block')}
			  initialOpen={ true }
		  >
			<TextControl
				label="anchor"
				value={ attributes.anchor }
				onChange={onChangeAnchor}
			/>
        </PanelBody>
      </InspectorControls>
      <div style={{
		  color: textColor.value,
	  }}>
        { attributes &&
          <RichText
            tagName="h5"
            className="more-below-title"
            placeholder={__("More Below", 'adspiration' )}
            onChange={( value ) => {
              setAttributes( { title: value } )
            } }
            value={ attributes.title || '' }
          /> }
		  <div style={{"height": "100px", "width":"100px"}}>
        <MediaUploadCheck>
          <MediaUpload
            onSelect={onSelectMedia}
            value={attributes.mediaId}
            allowedTypes={ ['image'] }
            render={({open}) => (
              <Button
                className={attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                onClick={open}
              >
                {attributes.mediaId == 0 && __('Choose an image', 'more-below')}
                {props.media != undefined &&
                  <ResponsiveWrapper
                    naturalWidth={ props.media.media_details.width }
                    naturalHeight={ props.media.media_details.height }
                  >
                    <img src={props.media.source_url} />
                  </ResponsiveWrapper>
                }
              </Button>
            )}
          />
        </MediaUploadCheck>
		  </div>
        {attributes.mediaId != 0 &&
          <MediaUploadCheck>
            <MediaUpload
              title={__('Replace image', 'awp')}
              value={attributes.mediaId}
              onSelect={onSelectMedia}
              allowedTypes={['image']}
              render={({open}) => (
                <Button onClick={open} isDefault isLarge>{__('Replace Icon', 'awp')}</Button>
              )}
            />
          </MediaUploadCheck>
        }
        {attributes.mediaId != 0 &&
          <MediaUploadCheck>
            <Button onClick={onRemoveMedia} isLink isDestructive>{__('Remove Icon', 'awp')}</Button>
          </MediaUploadCheck>
        }
      </div>
    </>
	);
}
