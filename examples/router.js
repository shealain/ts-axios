module.exports = function (router) {

    /* 基本用法-转换URL */
    router.get('/simple/get', function (req, res) {
        res.json({
            msg: `hello world`
        })
    })

    router.get('/base/get', function (req, res) {
        res.json(req.query)
    })

    /* 基本用法-data格式化 */
    router.post('/base/post', function (req, res) {
        res.json(req.body)
    })

    router.post('/base/buffer', function (req, res) {
        let msg = []
        req.on('data', (chunk) => {
            if (chunk) {
                msg.push(chunk)
            }
        })
        req.on('end', () => {
            let buf = Buffer.concat(msg)
            res.json(buf.toJSON())
        })
    })

    /* 错误值 */
    router.get('/error/get', function (req, res) {
        if (Math.random() > 0.5) {
            res.json({
                msg: `hello world`
            })
        } else {
            res.status(500)
            res.end()
        }
    })

    router.get('/error/timeout', function (req, res) {
        setTimeout(() => {
            res.json({
                msg: `hello world`
            })
        }, 3000)
    })
    /* extend */
    router.get('/extend/get', function (req, res) {
        res.json(req.body)
    })
    router.post('/extend/post', function (req, res) {
        res.json(req.body)
    })
    router.options('/extend/options', function (req, res) {
        res.json(req.body)
    })
    router.delete('/extend/delete', function (req, res) {
        res.json(req.body)
    })
    router.head('/extend/head', function (req, res) {
        res.json(req.body)
    })
    router.put('/extend/put', function (req, res) {
        res.json(req.body)
    })
    router.patch('/extend/patch', function (req, res) {
        res.json(req.body)
    })
    /* interceptor拦截器 */
    router.get('/interceptor/get', function (req, res) {
        res.json(req.body)
    })
    /* config默认配置 */
    router.post('/config/post', function (req, res) {
        res.json(req.body)
    })
    /* cancel取消请求 */
    router.get('/cancel/get',function(req,res){
        res.json({
            name:1111
        })
    })
    router.post('/cancel/post',function(req,res){
        res.json(req.body)
    })
}
