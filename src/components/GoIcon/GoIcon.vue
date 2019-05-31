<template>
  <span
    class="go-icon"
    :class="{
      [`icn-${name}`]: Boolean(name),
      [`icn-${size}`]: Boolean(size)
    }"
    data-testid="icon"
  />
</template>

<script>
export default {
  name: 'GoIcon',
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    size: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<docs>
## Sizing

```js
<p>
  <go-icon name="add" size="xxs" />
  <go-icon name="add" size="xs" />
  <go-icon name="add" />
  <go-icon name="add" size="md" />
  <go-icon name="add" size="xl" />
  <go-icon name="add" size="xxl" />
</p>
```

## Icons

```js
<go-icon name="accordion" />
```
```js
<go-icon name="add" />
```
```js
<go-icon name="add-file" />
```
```js
<go-icon name="admin-space" />
```
```js
<go-icon name="all-projects" />
```
```js
<go-icon name="announcement" />
```
```js
<go-icon name="arrow-back" />
```
```js
<go-icon name="arrow-right" />
```
```js
<go-icon name="article" />
```
```js
<go-icon name="assignment" />
```
```js
<go-icon name="attach-file" />
```
```js
<go-icon name="awards" />
```
```js
<go-icon name="bell" />
```
```js
<go-icon name="bracket" />
```
```js
<go-icon name="bracket-left" />
```
```js
<go-icon name="bracket-right" />
```
```js
<go-icon name="bracket-up" />
```
```js
<go-icon name="cancel" />
```
```js
<go-icon name="cap" />
```
```js
<go-icon name="check" />
```
```js
<go-icon name="check-circle" />
```
```js
<go-icon name="close" />
```
```js
<go-icon name="comment" />
```
```js
<go-icon name="comment-mode" />
```
```js
<go-icon name="comments" />
```
```js
<go-icon name="community" />
```
```js
<go-icon name="conversation" />
```
```js
<go-icon name="cross" />
```
```js
<go-icon name="cup" />
```
```js
<go-icon name="dashboard" />
```
```js
<go-icon name="delete" />
```
```js
<go-icon name="description-file" />
```
```js
<go-icon name="done" />
```
```js
<go-icon name="done-all" />
```
```js
<go-icon name="draggable-vertical" />
```
```js
<go-icon name="drive" />
```
```js
<go-icon name="drive-doc" />
```
```js
<go-icon name="drive-file" />
```
```js
<go-icon name="drive-sheet" />
```
```js
<go-icon name="drive-slide" />
```
```js
<go-icon name="drive-upload" />
```
```js
<go-icon name="dropdown" />
```
```js
<go-icon name="dropdown-back" />
```
```js
<go-icon name="dropdown-back-circle" />
```
```js
<go-icon name="dropup" />
```
```js
<go-icon name="duplicate" />
```
```js
<go-icon name="edit" />
```
```js
<go-icon name="email" />
```
```js
<go-icon name="empty" />
```
```js
<go-icon name="error" />
```
```js
<go-icon name="euro" />
```
```js
<go-icon name="exclamation" />
```
```js
<go-icon name="facebook" />
```
```js
<go-icon name="facebook-full" />
```
```js
<go-icon name="file-download" />
```
```js
<go-icon name="file-upload" />
```
```js
<go-icon name="filter" />
```
```js
<go-icon name="find-page" />
```
```js
<go-icon name="first-page" />
```
```js
<go-icon name="gallery" />
```
```js
<go-icon name="gavel" />
```
```js
<go-icon name="google" />
```
```js
<go-icon name="grade" />
```
```js
<go-icon name="grid-view" />
```
```js
<go-icon name="group" />
```
```js
<go-icon name="group-add" />
```
```js
<go-icon name="group-solo" />
```
```js
<go-icon name="hack" />
```
```js
<go-icon name="help" />
```
```js
<go-icon name="help-center" />
```
```js
<go-icon name="help-outline" />
```
```js
<go-icon name="horloge" />
```
```js
<go-icon name="horloge-small" />
```
```js
<go-icon name="image" />
```
```js
<go-icon name="info" />
```
```js
<go-icon name="jury" />
```
```js
<go-icon name="keyboard" />
```
```js
<go-icon name="landscape" />
```
```js
<go-icon name="last-page" />
```
```js
<go-icon name="light" />
```
```js
<go-icon name="like" />
```
```js
<go-icon name="liked" />
```
```js
<go-icon name="link" />
```
```js
<go-icon name="link-simple" />
```
```js
<go-icon name="linkedin" />
```
```js
<go-icon name="list-team" />
```
```js
<go-icon name="list-view" />
```
```js
<go-icon name="lock" />
```
```js
<go-icon name="mail" />
```
```js
<go-icon name="map" />
```
```js
<go-icon name="map-marker" />
```
```js
<go-icon name="mentor" />
```
```js
<go-icon name="mentors" />
```
```js
<go-icon name="menu" />
```
```js
<go-icon name="monitoring-forum" />
```
```js
<go-icon name="more" />
```
```js
<go-icon name="more-full" />
```
```js
<go-icon name="new" />
```
```js
<go-icon name="new-folder" />
```
```js
<go-icon name="no" />
```
```js
<go-icon name="no-entry" />
```
```js
<go-icon name="no-image" />
```
```js
<go-icon name="out" />
```
```js
<go-icon name="out-down" />
```
```js
<go-icon name="overview" />
```
```js
<go-icon name="page" />
```
```js
<go-icon name="pencil" />
```
```js
<go-icon name="person" />
```
```js
<go-icon name="prev" />
```
```js
<go-icon name="print" />
```
```js
<go-icon name="process" />
```
```js
<go-icon name="project" />
```
```js
<go-icon name="public" />
```
```js
<go-icon name="remove-folder" />
```
```js
<go-icon name="saml" />
```
```js
<go-icon name="school" />
```
```js
<go-icon name="screen-share" />
```
```js
<go-icon name="search" />
```
```js
<go-icon name="setting" />
```
```js
<go-icon name="settings" />
```
```js
<go-icon name="share" />
```
```js
<go-icon name="simple" />
```
```js
<go-icon name="sms" />
```
```js
<go-icon name="sort" />
```
```js
<go-icon name="star" />
```
```js
<go-icon name="stars" />
```
```js
<go-icon name="swap" />
```
```js
<go-icon name="tag" />
```
```js
<go-icon name="thumbnail" />
```
```js
<go-icon name="time" />
```
```js
<go-icon name="time-off" />
```
```js
<go-icon name="tiny-custombutton" />
```
```js
<go-icon name="trakers" />
```
```js
<go-icon name="translate" />
```
```js
<go-icon name="trophy" />
```
```js
<go-icon name="trophy-simple" />
```
```js
<go-icon name="twitter" />
```
```js
<go-icon name="upload" />
```
```js
<go-icon name="viadeo" />
```
```js
<go-icon name="visibility" />
```
```js
<go-icon name="visibility-off" />
```
```js
<go-icon name="warning" />
```
```js
<go-icon name="warning-simple" />
```
```js
<go-icon name="yammer" />
```
```js
<go-icon name="yes" />
```
</docs>
