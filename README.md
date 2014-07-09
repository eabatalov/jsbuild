jsbuild
=======

Grunt + NPM build files generator for complex JavaScript projects with many modules
and build options.

Planned features:
- Declarative json syntax for definition of modules dependencies
- Global compilation options and individual compilation option
  for each module dependency
- Building graph of dependencies, proper ordering of dependencies, cycles detection
- Generation of package.json + Gruntfile for compilation of all the modules into
  single js file with proper ordering of all the concatenated files
- package.json + Makefile generation for incremental builds
- jsbuild grunt task implementation for its output customization by your grunt logic.

This project is still in development. It is used by our team in production internally.
Feel free to fork!
