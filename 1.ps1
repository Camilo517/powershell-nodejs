param (
    [Parameter(Mandatory = $false)]
    [string] $ComputerName = 'localhost'
)

 
  $drives =  Get-NetAdapter | 
    Select-Object   @{Name='Ordenador';     Expr={$ComputerName}},
	@{Name='Nombre';     Expr={$_.Name}},
	@{Name='Descripcion';     Expr={$_.InterfaceDescription}},
	@{Name='Estado';     Expr={$_.Status}},
	@{Name='MAC';     Expr={$_.MacAddress}},
	@{Name='Velocidad';     Expr={$_.LinkSpeed}}    
        


$drives | ConvertTo-Json -Compress