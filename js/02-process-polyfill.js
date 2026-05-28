window.process = {
                env: {},
                argv: [],
                on: () => {
                    //alert("The server is stopping")
                },
                exit: () => {
                    alert("The server has been stopped on purpose")
                }
            }