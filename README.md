A Github Pages template for academic websites. This was forked (then detached) by [Stuart Geiger](https://github.com/staeiou) from the [Minimal Mistakes Jekyll Theme](https://mmistakes.github.io/minimal-mistakes/), which is © 2016 Michael Rose and released under the MIT License. See LICENSE.md.

I think I've got things running smoothly and fixed some major bugs, but feel free to file issues or make pull requests if you want to improve the generic template / theme.

Ruby dependencies are locked in `Gemfile.lock`; update dependencies deliberately and verify the build before committing changes.

# Instructions

1. Register a GitHub account if you don't have one and confirm your e-mail (required!)
1. Fork [this repository](https://github.com/academicpages/academicpages.github.io) by clicking the "fork" button in the top right. 
1. Go to the repository's settings (rightmost item in the tabs that start with "Code", should be below "Unwatch"). Rename the repository "[your GitHub username].github.io", which will also be your website's URL.
1. Set site-wide configuration and create content & metadata (see below -- also see [this set of diffs](http://archive.is/3TPas) showing what files were changed to set up [an example site](https://getorg-testacct.github.io) for a user with the username "getorg-testacct")
1. Upload any files (like PDFs, .zip files, etc.) to the files/ directory. They will appear at https://[your GitHub username].github.io/files/example.pdf.  
1. Check status by going to the repository settings, in the "GitHub pages" section
1. (Optional) Use the Jupyter notebooks or python scripts in the `markdown_generator` folder to generate markdown files for publications and talks from a TSV file.

See more info at https://academicpages.github.io/

## To run locally (not on GitHub Pages, to serve on your own computer)

### 本地调试（macOS）

在项目目录运行：

```bash
./scripts/setup   # 首次安装 Ruby 和网站依赖，需要联网
./scripts/dev     # 启动开发服务器
```

打开 <http://localhost:4000>。修改 Markdown、HTML、布局或 SCSS 后，网站会自动重新生成，浏览器会自动刷新。终端按 `Ctrl+C` 停止服务；下次只需运行 `./scripts/dev`。

运行环境使用 [mise](https://mise.en.dev/lang/ruby) 管理，Ruby 版本固定在 `mise.toml`。运行时安装到 `.local/`，Gem 依赖安装到 `vendor/bundle/`，均不提交到 Git。macOS 首次安装原生依赖需要 Command Line Tools（如未安装，运行 `xcode-select --install`）。无需修改系统 Ruby 或全局 shell 配置。

- 首页内容：`_pages/about.md`；其他页面：`_pages/`。
- 导航：`_data/navigation.yml`；布局：`_layouts/`、`_includes/`；样式：`_sass/`。
- 本地配置：`_config.dev.yml`（关闭统计和评论、使用本地地址）。修改任一 `_config*.yml` 后需要重启服务器。
- 浏览器开发者工具可检查样式、网络请求和 JavaScript；构建错误会显示在启动服务的终端中。
- 查看草稿：`./scripts/dev --drafts`；端口被占用：`./scripts/dev --port 4001`。
- 正式构建检查：`./scripts/build`，生成文件位于 `_site/`。该命令不会发布网站。

现有网页已包含编译后的 `assets/js/main.min.js`，日常修改内容和 SCSS 不需要 Node.js。若修改 `assets/js/_main.js` 或插件源码，需要另行安装 Node.js，并运行 `npm install`、`npm run build:js`；开发时可使用 `npm run watch:js`。

# Changelog -- bugfixes and enhancements

There is one logistical issue with a ready-to-fork template theme like academic pages that makes it a little tricky to get bug fixes and updates to the core theme. If you fork this repository, customize it, then pull again, you'll probably get merge conflicts. If you want to save your various .yml configuration files and markdown files, you can delete the repository and fork it again. Or you can manually patch. 

To support this, all changes to the underlying code appear as a closed issue with the tag 'code change' -- get the list [here](https://github.com/academicpages/academicpages.github.io/issues?q=is%3Aclosed%20is%3Aissue%20label%3A%22code%20change%22%20). Each issue thread includes a comment linking to the single commit or a diff across multiple commits, so those with forked repositories can easily identify what they need to patch.
