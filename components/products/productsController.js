const productsService = require('./productsService');
const e = require("express");
// exports.list = async (req, res) => {
//     let products = await productsService.list(!isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1:0);
//     res.render('products/productlist', {products: products});
// }

// exports.list = async(req, res) => {
//     try {
//         const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
//
//         const searchName = req.query.key;
//
//         const gt = req.query.gt;
//         const price = req.query.price;
//         let prices = Array(0, 1);
//         if (price != null) {
//             prices = price.split(',')
//         }
//         const mau = req.query.mau;
//
//         const products = await productsService.list(page, searchName, gt, prices[0] * 22000, prices[1] * 22000, mau);
//         res.render('products/productlist', { products: products });
//
//     } catch (err) {
//         console.log(err);
//     }
// }

exports.list = async(req, res) => {
    try {
        const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;

        const searchName = req.query.key;

        const gt = req.query.gt;
        const price = req.query.price;
        let prices = Array(0, 1);
        if (price != null) {
            prices = price.split(',')
        }
        const mau = req.query.mau;
        const sapxep=req.query.sapxep;
      
        const products = await productsService.list(page, searchName, gt, prices[0] * 22000, prices[1] * 22000, mau);
        if(sapxep!='0'&&sapxep!=undefined)
        {
            if(sapxep=='down')
            {
                for(let i=0;i<products.length-1;i++)
                {
                    for(let j=i+1;j<products.length;j++)
                    {
                        if(products[i].GIA<products[j].GIA)
                        {
                            let a=products[i];
                            products[i]=products[j];
                            products[j]=a;
                        }
                    }
                }
            }
            else
            {
                for(let i=0;i<products.length-1;i++)
                {
                    for(let j=i+1;j<products.length;j++)
                    {
                        if(products[i].GIA>products[j].GIA)
                        {
                            let a=products[i];
                            products[i]=products[j];
                            products[j]=a;
                        }
                    }
                }
            }
        }
        if(req.user!==undefined&&req.user!=='')
        {
            const users = await productsService.listUser(req.user.userId);
          
            products.forEach(element => {
                element.users = users[0].USER_ID
            });
            res.render('products/productlist', { products: products, user: users });


        }
        else
        {
          res.render('products/productlist', { products: products });
        }

    } catch (err) {
        console.log(err);
    }
}


exports.addCart = async(req, res) => {

    if (req.body.user_id !== ''&&req.body.user_id!==undefined) {

        const user_id = req.body.user_id;
        const quanao_id = req.body.quanao_id;
        const Cart = await productsService.addCart(user_id);
        const Cart_ID = Cart.GIOHANG_ID;
        const CartDetail = await productsService.findCartDetail(Cart_ID, quanao_id);
        if (CartDetail != null) {
            await productsService.Update(CartDetail.GIOHANG_ID, CartDetail.QUANAO_ID, CartDetail.SO_LUONG + 1)
        } else {
            const so_luong=1;
             await productsService.createCart(Cart_ID, quanao_id,so_luong);
        }
        res.redirect('back');
    }
    else
    {
    res.redirect('/auth');
    }
}



exports.showDetail = async (req, res) => {
    const productDetail = await productsService.showDetail(req.query.ID)
    const comment = await productsService.Commentlist(req.query.ID, !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1:0)
    res.render('products/productdetail', {productDetail: productDetail, comment: comment});
}

