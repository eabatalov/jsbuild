jsbuild
=======

Grunt + NPM build files generator for complex JavaScript projects with many modules
and build options.

Current javascript dev best practices recommend to use dynamic js modules linking performed in runtime.
This tool takes opposite approach. It works similar to traditional ways of binary executables compilation and linking.

Exact workflow is the following.
Each module of your project contains jsbuild.json file. You describe each module sources, dependencies and compilation options in it.
Then you run jsbuild on module you need to build with certain compilation options you need. Module dependency tree is collected, NPM package.json and Gruntfile.js are generated. After that you can run grunt in your module directory and get its compiled source.
There is no need to use dynamic linking (such as requirejs) in this workflow at all. The workflow and the tool are very simple.

Dynamic linking in runtime has compatability issues with different runtimes. Especially runtimes that doesn't provide DOM (ex. CocoonJS and others). Even DOM capable runtimes has problems. See https://www.nothing.ch/en/research/using-optimised-requirejs-combination-phonegap.
Having many advantages dynamic linking usage is rather complicated. Sometimes it is overkill.

Implemented features:
- Declarative json syntax for definition of modules dependencies
- Global compilation options for build, individual compilation options
  for each module dependency, conditional compilation of module sources and dependencies
- Building graph of dependencies, proper ordering of dependencies, cycles detection
- Generation of package.json + Gruntfile for compilation of all the modules into
  single js file with proper ordering of all the concatenated files

Planned features:
- Complete tool usage tutorial
- Tool unit tests implementation

Nice to have features:
- jsbuild command which is always avaliable in user shell (like grunt-cli provides easy access to grunt)
- package.json + Makefile generation for incremental builds
- jsbuild grunt task implementation for its output customization by custom Gruntfile.js

This project is still in development. It is used by our team in production.
It helps us to build cross-platform javascript packages out of our ramose source tree very easily.

Let's work together on the project if you are interested! ;)
