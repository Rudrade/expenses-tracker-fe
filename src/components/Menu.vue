<template>
    <div class="menu">
        <ul>
            <li>
                <RouterLink to="/" activeClass="menu-active">
                    <img src="../icons/home.svg"/><span>Home</span>
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/expenses" activeClass="menu-active">
                    <img src="../icons/bill.svg" /><span>Expenses</span>
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/temp-1" activeClass="menu-active">
                    <img src="../icons/repeat-bill.svg" /><span>Recurring Expenses</span>
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/temp-2" activeClass="menu-active">
                    <img src="../icons/logout.svg" /><span>Logout</span>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>