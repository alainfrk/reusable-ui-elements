# Reusable UI Elements

Some simple UI Elements to reuse and build upon in other projects.

They're desktop-first so it's up to you to implement responsiveness.

**Note :** Due to the CORS policy, elements relying on dynamic content may not load data correctly when accessed via the "file://" protocol. To run dynamic elements locally, you need a local server. An option is to use the "Live Server" extension in Visual Studio Code. Also, don't forget to sanitize fetched data.

| Folder/Element    | Description                                              |
| ----------------- | -------------------------------------------------------- |
| boilerplate       | Initial files: HTML, CSS, and JS                         |
| carousel-dynamic  | Carousel of slides based on dynamic content              |
| carousel-static   | Carousel of slides based on static content               |
| img               | Shared placeholder images                                |
| pagination-1query | Pagination based on data fetched only once               |
| tabs-dynamic-1    | Static layout, textual content is fetched dynamically    |
| tabs-dynamic-2    | Dynamic layout and content based on fetched data         |
| tabs-static-1     | Tabs and main content have different background colors   |
| tabs-static-2     | Tabs and main content share the same background color    |
| tabs-static-3     | Each tab and its content have their own background color |
