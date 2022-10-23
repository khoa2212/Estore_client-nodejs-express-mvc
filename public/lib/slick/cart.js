$('.btn-remove').on('click',function(){
    try
    {
    $('#removeallcart').submit();
    }
    catch(err)
    {
        console.log(err);
    }
    
})
