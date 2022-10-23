const cartService = require('./cartService')

exports.list = async(req, res) => {
    if (req.user !== undefined) {
        const Cart = await cartService.list(req.user.userId);
        const CartDetail = await cartService.listDetail(Cart.GIOHANG_ID);
        let CartDetailWithLoai=[];
        for(let i=0;i<CartDetail.length;i++)
        {
                const CartDetail1= await cartService.listQuanAoDetail(CartDetail[i].QUANAO_ID);
                CartDetailWithLoai.push(CartDetail1);
                CartDetailWithLoai[i].SO_LUONG=CartDetail[i].SO_LUONG;
                CartDetailWithLoai[i].GIOHANG_ID=Cart.GIOHANG_ID;
        }
        
        let total=0;
        for(let i=0;i<CartDetailWithLoai.length;i++)
        {
            total+=CartDetailWithLoai[i].SO_LUONG*CartDetailWithLoai[i].GIA;
        }
        res.render('cartLayout', { cart: CartDetailWithLoai, total:total });
    } else {
        res.redirect('/auth');
    }
}
exports.remove = async(req,res)=>{

    let giohang_id=req.body.giohang_id;
    let quanao_id=req.body.quanao_id;
    let response = await cartService.remove(giohang_id,quanao_id);

    res.redirect('back')
}
exports.removeAll = async(req,res)=>{
    let giohang_id=req.body.giohang_id1;
    let response = await cartService.removeAll(giohang_id);
    res.redirect('/');
}