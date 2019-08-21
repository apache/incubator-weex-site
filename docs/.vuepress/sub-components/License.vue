<template>
  <footer class="footer-container">
    <div class="footer-body">
      <img class="logo" src="/logo@2x.svg">
      <img class="apache" src="//img.alicdn.com/tfs/TB11BRiIW6qK1RjSZFmXXX0PFXa-365-365.png">
      <div class="cols-container">
        <div class="col col-12">
          <h3>Disclaimer</h3>
          <p>Apache Weex is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the
            Incubator. Incubation is required of all newly accepted projects until a further review indicates that the
            infrastructure, communications, and decision making process have stabilized in a manner consistent with
            other successful ASF projects. While incubation status is not necessarily a reflection of the completeness
            or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.</p>
        </div>
        <div class="col col-4">
          <dl><dt>ASF</dt>
            <dd><a href="http://www.apache.org" target="_self">Foundation</a></dd>
            <dd><a href="http://www.apache.org/licenses/" target="_self">License</a></dd>
            <dd><a href="http://www.apache.org/events/current-event" target="_self">Events</a></dd>
            <dd><a href="http://www.apache.org/foundation/sponsorship.html" target="_self">Sponsorship</a></dd>
            <dd><a href="http://www.apache.org/foundation/thanks.html" target="_self">Thanks</a></dd>
          </dl>
        </div>
        <div class="col col-4">
          <dl><dt>Documentation</dt>
            <dd><a href="/guide/develop/create-a-new-app.html" target="_self">Quick start</a></dd>
            <dd><a href="/guide/develop/setup-develop-environment.html" target="_self">Developer guide</a></dd>
          </dl>
        </div>
        <div class="col col-4">
          <dl><dt>Resources</dt>
            <dd><a href="/blog/write-a-blog.html" target="_self">Blog</a></dd>
            <dd><a href="/community/" target="_self">Community</a></dd>
            <dd><a href="/guide/contribute/thanks.html" target="_self">Thanks by Weex</a></dd>
            <dd><a href="https://www.apache.org/security/" target="_self">Security</a></dd>
          </dl>
        </div>
      </div>
      <div class="copyright"><span>Copyright © 2018-2019 The Apache Software Foundation. Apache and the Apache feather
          logo are trademarks of The Apache Software Foundation.</span></div>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
    background: #F8F8F8;
}

.footer-container .footer-body {
    max-width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 40px 40px 0;
}

@media screen and (max-width: 640px) {
    .footer-container .footer-body {
        padding-left: 20px;
        padding-right: 20px;
    }
}

.footer-container .footer-body img {
    width: 100px;
    height: 40px;
    margin-left: -10px;
    margin-bottom: 28px;
    vertical-align: middle;
}

.footer-container .footer-body .apache {
    width: 50px;
    height: 50px;
    margin-left: 0;
}

.footer-container .footer-body .cols-container {
    margin-bottom: 60px;
}

.footer-container .footer-body .cols-container .col {
    display: inline-block;
    box-sizing: border-box;
    vertical-align: top;
}

.footer-container .footer-body .cols-container .col-12 {
    width: 50%;
    padding-right: 125px;
}

.footer-container .footer-body .cols-container .col-6 {
    width: 25%;
}

.footer-container .footer-body .cols-container .col-4 {
    width: 16.666667%;
}

.footer-container .footer-body .cols-container h3 {
    font-family: Avenir-Heavy;
    font-size: 18px;
    color: #333;
    line-height: 18px;
    margin-bottom: 20px;
}

.footer-container .footer-body .cols-container p {
    font-family: Avenir-Medium;
    font-size: 12px;
    color: #999;
    line-height: 18px;
}

.footer-container .footer-body .cols-container dl {
    font-family: Avenir-Heavy;
    line-height: 18px;
}

.footer-container .footer-body .cols-container dt {
    font-weight: bold;
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
}

.footer-container .footer-body .cols-container dd {
    padding: 0;
    margin: 0;
}

.footer-container .footer-body .cols-container dd a {
    text-decoration: none;
    display: block;
    font-size: 14px;
    color: #999;
    margin: 10px 0;
}

.footer-container .footer-body .cols-container dd a:hover {
    color: #2DACEC;
}

.footer-container .footer-body .copyright {
    border-top: 1px solid #ccc;
    min-height: 60px;
    line-height: 20px;
    text-align: center;
    font-family: Avenir-Medium;
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: center;
}

.footer-container .footer-body .copyright span {
    display: inline-block;
    margin: 0 auto;
}

@media screen and (max-width: 640px) {
    .footer-container .footer-body .cols-container .col {
        width: 100%;
        text-align: center;
        padding: 0;
    }
}
</style>

