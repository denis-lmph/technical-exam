```
# PSD to Web Page Exam

This is a simple project setup using Gulp for build automation with SCSS and JavaScript.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/denis-lmph/technical-exam.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

- Run the default Gulp task to compile SCSS, minify CSS and JavaScript, and copy HTML files:
  ```bash
  gulp
  ```

- To watch for changes and automatically recompile assets, run:
  ```bash
  gulp watch
  ```

## Project Structure

- `src/`: Contains the source files
  - `js/`: JavaScript files
  - `scss/`: SCSS files
  - `index.html`: Main HTML file

- `dist/`: Contains the compiled and minified files

## Dependencies

- [gulp](https://www.npmjs.com/package/gulp): Task runner
- [gulp-sass](https://www.npmjs.com/package/gulp-sass): Compile SCSS to CSS
- [gulp-csso](https://www.npmjs.com/package/gulp-csso): Minify CSS
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify): Minify JavaScript

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
