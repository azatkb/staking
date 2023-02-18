function AdminSidebar(){

    let location = window.location.href;
    
    return(
        <div className="cabinet__sidebar">
            <div className="cabinet__menu gray">
               <a className={ location.indexOf('purchases') > 0 ? "cabinet__menu-link active" : "cabinet__menu-link"} href="/purchases">Покупки
                   <img className="menu-link__triangle" src="img/icons/menu-link__triangle.svg" alt=""/>
               </a>
               <a className={ location.indexOf('chart') > 0 ? "cabinet__menu-link active" : "cabinet__menu-link"} href="/chart">Посещения
                   <img className="menu-link__triangle" src="img/icons/menu-link__triangle.svg" alt=""/>
               </a>
               <a className={ location.indexOf('users') > 0 ? "cabinet__menu-link active" : "cabinet__menu-link"} href="/users">Пользователи
                   <img className="menu-link__triangle" src="img/icons/menu-link__triangle.svg" alt=""/>
               </a>
               <a className={ location.indexOf('transaction') > 0 ? "cabinet__menu-link active" : "cabinet__menu-link"} href="/transaction">Транзакция
                   <img className="menu-link__triangle" src="img/icons/menu-link__triangle.svg" alt=""/>
               </a>
               <a className={ location.indexOf('tickets') > 0 ? "cabinet__menu-link active" : "cabinet__menu-link"} href="/tickets">Тикеты
                   <img className="menu-link__triangle" src="img/icons/menu-link__triangle.svg" alt=""/>
               </a>
            </div>
       </div>
    )
}

export default AdminSidebar;